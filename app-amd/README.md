# Example of using $linq with RequireJS (AMD)

This is a simple example of using $linq within a web page that uses RequireJS as the module loader.

The most important parts of this example are in the [main.js](https://github.com/battousai999/js-linq-test-apps/blob/master/app-amd/public/javascripts/main.js) file.  In that file, you can see how the $linq module is loaded:

```javascript
require(["javascripts/jslinq"], function(jslinq) 
{
  var Linq = jslinq.Linq;

  ...
}
```

## Building the application

To build this example, run the following commands:

```
npm install
npm run build
```

This will, primarily, copy some files (require.js and the AMD version of jslinq.js) into the `public/javascripts` folder.

## Running the application

To run this example, execute the following command:

```
npm start
```

This will start the web server on localhost port 3000.  Then, just open a browser and navigate to http://localhost:300.

