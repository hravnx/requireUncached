requireUncached
===============

A utility function to be able to work with uncached modules (e.g. for testing)

This is similar to [this repo](https://github.com/sindresorhus/require-uncached) except this
actually works with sub-modules.

## Installation

	npm install requireuncached --save

## Usage
	
	var requireUncached = require('requireuncached');

	var myMod = requireUncached('../mymodule');

	// if myMod is required again later while node is still running this session
	// (for instance because of running tasks triggered by gulp.watch), the module
	// will not be in the require.cache and will be reloaded

## Tests	

	npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.

## Release History

* 0.1.0 Initial release	
* 0.1.1 Republish to npm

