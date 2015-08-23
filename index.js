import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import promisify from 'es6-promisify';
import throat from 'throat';
import glob from 'glob';

/**
 * How many hashes can be executed at once.
 * Should be under OS fd limit.
 */
const HASH_CONCURRENCY = 10;

/**
 * Promisify glob function
 */
const globP = promisify(glob);

function hashFile(filename) {
    const shasum = crypto.createHash('sha1');
    const stream = fs.ReadStream(filename);

    return new Promise((resolve, reject) => {
        stream.on('data', data => {
            shasum.update(data);
        });

        stream.on('end', () => {
            const hash = shasum.digest('hex');
            const hashText = hash.toString();
            
            resolve(hashText);
        });

        stream.on('error', err => {
            reject(err);
        });
    });
}

export default async function hashFiles(pattern, options = {}) {
    const result = {};

    // force to not list directories
    options.nodir = true;

    const files = await globP(pattern, options);

    // use throat to limit concurrency of how many hash functions execute at once
    const hashPromises = files.map(throat(HASH_CONCURRENCY, async function(filename) {
        const fullPath = path.resolve(options.cwd || process.cwd(), filename);
        const hash = await hashFile(fullPath);

        result[filename] =  hash;
    }));

    await Promise.all(hashPromises);

    return result;
}
