var assert = require('assert');

var moda = require('./moda');

assert.strictEqual(process.moda, 1);
assert.strictEqual(process.moda1, 1);

// do it again, counts should still be one, because of the require cache
moda = require('./moda');

assert.strictEqual(process.moda, 1);
assert.strictEqual(process.moda1, 1);

// now do the uncached version
var requireUncached = require('../index');

var moda = requireUncached('./moda');
assert.strictEqual(process.moda, 1);
assert.strictEqual(process.moda1, 1);

// when we do it again this time, the counts should be incremented, 
// because the modules are loaded twice
moda = require('./moda');

assert.strictEqual(process.moda, 2);
assert.strictEqual(process.moda1, 2);

