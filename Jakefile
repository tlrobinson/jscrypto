var FILE = require("file");
var OS = require("os");
var JAKE = require("jake");

JAKE.task("default", ["build"]);
JAKE.task("build", ["lib/jscrypto.js"]);

// lib/jscrypto.js: jscrypto/js/jscrypto.js src/post.js
//  mkdir -p lib
//  cat $< > $@
JAKE.file("lib/jscrypto.js", ["jscrypto/js/jscrypto.js", "src/post.js"], function(t) {
    FILE.mkdirs("lib");
    
    var output = FILE.open(t.name(), "w");
    t.prerequisites().forEach(function(source) {
        FILE.open(source, "r").copy(output).close();
    });
    output.close();
});

// jscrypto/js/jscrypto.js: jscrypto.zip
//  unzip $<
//  touch jscrypto/js/jscrypto.js
JAKE.file("jscrypto/js/jscrypto.js", ["jscrypto.zip"], function(t) {
    OS.system(["unzip", t.prerequisites()[0]]);
    FILE.touch(t.name()); // touch since the timestamp is older
});

// jscrypto.zip:
//  curl http://crypto.stanford.edu/sjcl/jscrypto.zip -o $@
JAKE.file("jscrypto.zip", function(t) {
    OS.system(["curl", "http://crypto.stanford.edu/sjcl/jscrypto.zip", "-o", t.name()]);
});

// clean:
//  rm -rf jscrypto jscrypto.zip __MACOSX
require("jake/clean").CLEAN.include(["jscrypto", "jscrypto.zip", "__MACOSX"]);

// clobber: clean
//  rm -rf lib/jscrypto.js
require("jake/clean").CLOBBER.include(["lib/jscrypto.js"]);

// test:
//  narwhal tests/all-tests.js
JAKE.task("test", function() {
    OS.system(["narwhal", "tests/all-tests.js"]);
});
