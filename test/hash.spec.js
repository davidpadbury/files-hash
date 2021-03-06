import hash from '..';
import { expect } from 'chai';

describe('hash', () => {
    describe('hashing example directory', () => {

        let hashes;

        before(async function(){
            hashes = await hash('**/*', { cwd: 'test/examples/simple'});
        });

        it('should have a property for each file in glob', () => {
            expect(hashes['hello1.txt']).to.be.sha1digest;
            expect(hashes['hello2.txt']).to.be.sha1digest;
        });

        it('shouldnt have any other keys', () => {
            expect(hashes).to.have.all.keys('hello1.txt', 'hello2.txt');
        });

    });

    describe('not specifying working directory', () => {
    
        let hashes;

        before(async function() {
            hashes = await hash('test/**/*.spec.js');
        });

        it('should use current working directory', () => {
            // The glob should match this file from the working directory of the root of the project
            expect(hashes).to.have.keys('test/hash.spec.js');
        });

    });

    describe('hashing directory with subdirectory', () => {

        let hashes;

        before(async function() {
            hashes = await hash('**/*', { cwd: 'test/examples/dirs' });
        });

        it('should include directory in key', () => {
            expect(hashes['subdir/hello2.txt']).to.be.sha1digest;
        });

    });
});
