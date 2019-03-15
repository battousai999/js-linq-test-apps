# Example of using $linq with ES6

This is a simple example of using $linq within a web page that uses the native capabilities of ES6 to load the $linq library.

The most important parts of this example are in the [index.html](https://github.com/battousai999/js-linq-test-apps/blob/master/app-es6/public/index.html) file.  In that file, you can see how the $linq module is loaded using ES6's `import` keyword:

```javascript
import {Linq} from './javascripts/jslinq.js';

...
```

## Building the application

To build this example, run the following commands:

```
npm install
npm run build
```

This will, primarily, copy the ES6 (non-transpiled) version of jslinq.js into the `public/javascripts` folder.

## Running the application

To run this example, execute the following command:

```
npm start
```

This will start the web server on localhost port 3000.  Then, just open a browser and navigate to http://localhost:300.

