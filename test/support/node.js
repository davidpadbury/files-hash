import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

/**
 * Matcher for SHA1 hash digests.
 * Checks that they're 40 chars long and made of only hex chars.
 **/
chai.Assertion.addProperty('sha1digest', function() {
    this.assert(
        /^[a-z0-9]{40}$/.exec(this._obj),
        'expected #{this} to be a sha1 digest',
        'expected #{this} not to be a sha1 digest'
    );
});
