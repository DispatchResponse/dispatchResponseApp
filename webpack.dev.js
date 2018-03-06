/**
 * webpack.dev.js
 *
 */

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')

module.exports = merge(common, {
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
