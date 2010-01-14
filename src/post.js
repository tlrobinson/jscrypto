// vars to prevent globals
var Random;
var i;

// module exports
exports.CCM = CCM;
exports.OCB = OCB;
exports.Random = Random;
exports.SHA256 = SHA256;
exports.aes = aes;
exports.cipherCCM = cipherCCM;
exports.cipherOCB = cipherOCB;
exports.generateKey = generateKey;

// a helper to seed from /dev/random
var bytesPerSeed = 10;
Random.seed_with_dev_random = function(paranoia) {
    var rand_source = require("file").open("/dev/random", "b");
    while (!Random.is_ready(paranoia)) {
        //print("progress="+Random.get_progress())
        var random_bytes = rand_source.read(bytesPerSeed).toArray();
        print("random_bytes="+random_bytes);
        Random.add_entropy(random_bytes, 8*bytesPerSeed, "/dev/random");
    }
}

