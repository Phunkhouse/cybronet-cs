const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    clean: true,
    path: path.join(__dirname, '/prod/bundles'),
    filename: 'bundled.js',
    assetModuleFilename: 'img/[name][ext]',
  },
  optimization: {
    minimize: true,
  },
})
