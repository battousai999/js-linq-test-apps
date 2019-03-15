# Example of using $linq with CommonJS

This is a simple example of using $linq within a web page that uses CommonJS as the module loader.

The most important parts of this example are in the [main.js](https://github.com/battousai999/js-linq-test-apps/blob/master/app-cjs/public/javascripts/main.js) file.  In that file, you can see how the $linq module is loaded:

```javascript
var Linq = require('js-linq').Linq;

...
```

## Building the application

To build this example, run the following commands:

```
npm install
npm run build
```

This will, primarily, run [browserify](http://browserify.org) to bundle the [main.js](https://github.com/battousai999/js-linq-test-apps/blob/master/app-cjs/public/javascripts/main.js) file along with its dependencies (i.e., $linq).

## Running the application

To run this example, execute the following command:

```
npm start
```

This will start the web server on localhost port 3000.  Then, just open a browser and navigate to http://localhost:300.

