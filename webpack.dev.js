const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: path.join(__dirname, "public/"),
    static: {
      directory: path.join(__dirname, 'public'),
      // directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    // publicPath: "http://localhost:3000/dist/",
    // hotOnly: true,
    historyApiFallback: true,
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
  // plugins: [new webpack.HotModuleReplacementPlugin()]
});