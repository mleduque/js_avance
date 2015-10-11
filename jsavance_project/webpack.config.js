var path = require('path');
module.exports = {
  entry: "./src/js/entry.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  module: {
      loaders: [
          {
            // load es6 files using babel-loader
            test: path.join(__dirname, 'src/es6'),
            loader: 'babel'
          },
          { test: /\.css$/, loader: "style!css" }
      ]
  }
};
