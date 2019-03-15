# Overview

This repository is a collection of four different example applications, each using the 2.0 version of the [$linq](https://github.com/battousai999/js-linq) library, but with different module loading scenarios.

* The [app-es6](https://github.com/battousai999/js-linq-test-apps/tree/master/app-es6) application uses the $linq library in its ES6, non-transpiled form.

* The [app-cjs](https://github.com/battousai999/js-linq-test-apps/tree/master/app-cjs) application uses a transpiled version of the $linq library designed to be loaded using the [CommonJS](http://www.commonjs.org/) module loader.

* The [app-amd](https://github.com/battousai999/js-linq-test-apps/tree/master/app-amd) application uses a transpiled version of the $linq library designed to be loaded using the [RequireJS](https://requirejs.org/) module loader.

* The [app-node](https://github.com/battousai999/js-linq-test-apps/tree/master/app-node) application uses a transpiled version of the $linq library (the same version as the [app-cjs](https://github.com/battousai999/js-linq-test-apps/tree/master/app-cjs) application) designed to be loaded using node.js' [require()](https://nodejs.org/docs/latest/api/modules.html#modules_require_id) function.