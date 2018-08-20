const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const entries = {
    "hashes": "./hashes.js",
    "hashes.min": "./hashes.js",

    "md5": "./md5.js",
    "md5.min": "./md5.js",
}

const defaults = {
  mode: 'production',
  entry: {
    "hashes": "./hashes.js",
    "hashes.min": "./hashes.js",

    "md5": "./md5.js",
    "md5.min": "./md5.js",

    "sha1": "./sha1.js",
    "sha1.min": "./sha1.js",
  },
  devtool: "source-map",
  output: {
    path: __dirname + '/dist',
    filename: "[name].js"
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  }
}

const clientConfig = Object.assign({}, defaults, {
  target: 'web',
  output: {
    path: __dirname + '/dist',
    filename: "[name].js"
  },
});


const serverConfig = Object.assign({}, defaults, {
  target: 'node',
  output: {
    path: __dirname + '/dist',
    filename: "[name].node.js"
  },
});

module.exports = [ serverConfig, clientConfig ];
