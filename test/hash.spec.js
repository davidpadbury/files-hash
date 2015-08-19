import hash from '..';
import { expect } from 'chai';

describe('hash', () => {
    describe('hashing example directory', () => {

        let hashes;

        before(async function(){
            hashes = await hash('**/*', { cwd: 'test/example'});
        });

        it('should have a property for each file in glob', () => {
            expect(hashes['hello1.txt']).to.be.sha1digest;
            expect(hashes['hello2.txt']).to.be.sha1digest;
        });

        it('shouldnt have any other keys', () => {
            expect(hashes).to.have.all.keys('hello1.txt', 'hello2.txt');
        });

    });
});
