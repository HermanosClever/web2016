var webpack = require('webpack');

var config = require('./webpack.config.server');

config.cache   = true;
config.debug   = true;
config.devtool = 'source-map';
config.watch   = true;

config.entry.index.unshift(
  'webpack/hot/poll?1000'
);

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__:     false,
    __SERVER__:     true,
    __PRODUCTION__: false,
    __DEV__:        true
  }),

  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

config.module.postLoaders = [{
  exclude: /node_modules/,
  loader:  'babel-loader',
  test:    /\.jsx?$/,

  query: {
    cacheDirectory: true,

    presets: [
      'es2015',
      'react'
    ]
  }
},
  {
    test: /\.scss$/,
     loaders: [
        'isomorphic-style-loader',
        'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
        'postcss-loader'
      ]
  }
];

module.exports = config;
