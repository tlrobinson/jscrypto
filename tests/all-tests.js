var FILE = require("file");
var ASSERT = require("test/assert");

var JSCRYPTO;
exports.testNoGlobals = function() {
    JSCRYPTO = require("jscrypto");
}

exports.testSeedWithDevRandom = function() {
    var Random = JSCRYPTO.Random;
    
    Random.seed_with_dev_random();
    
    // FIXME: this returns 1 for ready, 2 for needs reseed
    //ASSERT.isTrue(!!(Random.READY & Random.is_ready()));
    ASSERT.isTrue(!!Random.is_ready());
}

exports.testEncrypt = function() {
    var cookie_val = "hello world!";
    
    var key = JSCRYPTO.Random.random_words(4);
    var iv = JSCRYPTO.Random.random_words(4);

    // Create a new cipher object (in OCB mode) using the randomly generated key
    var cipher = new JSCRYPTO.aes(key, JSCRYPTO.OCB);

    // Now encrypt and authenticate the cookie bytes using the randomly generated IV
    var encrypted_cookie = [];
    var MAC_tag = [];
    
    cipher.encrypt(iv, cookie_val, encrypted_cookie, "", MAC_tag);
    
    print(JSCRYPTO.aes._hexall(encrypted_cookie));
    
    var plaintext = cipher.decrypt(encrypted_cookie, "", MAC_tag);
    
    ASSERT.eq(cookie_val, plaintext);
}

if (require.main == module)
    require("os").exit(require("test/runner").run(exports));
