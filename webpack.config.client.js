var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry:  {
    index: [
      './src/client'
    ]
  },

  output: {
    filename: '[name].js',
    path:     path.join(__dirname, 'client')
  },

  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__:     true,
      __SERVER__:     false,
      __PRODUCTION__: true,
      __DEV__:        false
    }),
    new ExtractTextPlugin("styles.css"),

    // NOTE: https://github.com/gaearon/babel-plugin-react-transform#configuration
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  module: {
   
  },

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
