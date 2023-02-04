const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  entry: [
    __dirname + '/js/main.js',
    __dirname + '/sass/style.scss',
    __dirname + '/js/sprites.js',
  ],
  output: {
    path: path.join(__dirname, '/dist/bundles'),
    filename: 'bundled.js',
    assetModuleFilename: 'img/[name][ext]',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node-modules/,
      loader: 'babel-loader',
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ]
    }, {
      test: /(img).+\.(png|jpg|jpeg|gif|svg|webp)$/i,
      type: 'asset/resource'
    }, {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      options: {
        extract: true,
        spriteFilename: './img/sprite.svg',
      }
    }]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
}
