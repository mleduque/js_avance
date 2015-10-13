var path = require('path');
module.exports = {
  entry: "./src/js/entry.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  devtools: 'source-map',
  module: {
      loaders: [
          {
            // load es6 files using babel-loader
            test: path.join(__dirname, 'src/es6'),
            loader: 'babel'
          },
          { test: /\.css$/, loader: "style!css" }
      ]
  },
  devServer: {
    proxy: [
      {
        path: new RegExp('/services/(.*)'),
        target: 'http://localhost:8090',
        rewrite: function(req, options) {
          req.url = req.path.replace(options.path, '$1');
        }
      }
    ]
  }
};
