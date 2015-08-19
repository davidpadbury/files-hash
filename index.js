import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import promisify from 'es6-promisify';
import glob from 'glob';

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

export default async function hashFiles(pattern, options) {
    const result = {};
    const files = await globP(pattern, options);
    const hashPromises = files.map(async function(filename) {
        const fullPath = path.resolve(options.cwd || process.cwd(), filename);
        const hash = await hashFile(fullPath);

        result[filename] =  hash;
    });

    await Promise.all(hashPromises);

    return result;
}
