const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  // devServer block added so running webpack-dev-server with the
  // production config will still fallback to index.html for SPA routes
  // (useful when launching with --config webpack.prod.js)
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8080,
    historyApiFallback: true,
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    // }
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // Enable multi-threaded processing
      }),
    ],
  }

});