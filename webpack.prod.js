const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
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