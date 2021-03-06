var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  target: 'node',

  entry: {
    index: [
      './src/server'
    ]
  },

  output: {
    filename: '[name].js',
    path:     path.join(__dirname, 'server')
  },

  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__:     false,
      __SERVER__:     true,
      __PRODUCTION__: true,
      __DEV__:        false
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  module: {},

  // SEE: http://jlongster.com/Backend-Apps-with-Webpack--Part-I
  externals: fs.readdirSync('node_modules').reduce(function (accumulator, module) {
    accumulator[module] = 'commonjs ' + module;

    return accumulator;
  }, {}),

  // NOTE: https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    // NOTE: https://webpack.github.io/docs/configuration.html#resolve-extensions
    extensions: [
      '',
      '.js',
      '.jsx',
      '.scss'
    ],

    // NOTE: https://webpack.github.io/docs/configuration.html#resolve-root
    root: path.join(__dirname, 'src')
  }
};
