const assert = require('chai').assert;
const User = require('../../lib/models/user');

describe('user model', () => {
    const testUser = new User({
        email: 'test@test.com'
    });

    const password = 'XYZ';

    it('generates hash from password', () => {
        testUser.generateHash(password);
        assert.isOk(testUser.hash);
        assert.notEqual(testUser.hash, password);
    });

    it('compares password', () => {
        assert.isTrue(testUser.comparePassword('XYZ'));
        assert.isFalse(testUser.comparePassword('ABC'));
    });
})