const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    stats: 'minimal',
  }
});
