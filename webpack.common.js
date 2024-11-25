const path = require("path");
const webpack = require("webpack");
// const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  // entry: {
  //   index: './src/index.js', // Main entry point
    // app: {
    //   import: './src/App.js',
    //   dependOn: ['entrieslayout', 'about', 'gallery']
    // },
    // entrieslayout: './src/components/entry/EntriesLayout.js',
    // about: './src/components/about-card/AboutCard.js',
    // gallery: './src/components/gallery/Gallery.js'
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          'file-loader',
        ]
      },
      { // 3D Models
        test: /\.(3mf|fbx|glb)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', 
              outputPath: 'models/',
            },
          },
        ],
      },
      {
        test: /\.bin$/,
        exclude: /(node_modules|\.\/src\/models)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              encoding: false,
              mimetype: false,
              generator: (content) => {
                return content;
              }
            },
          },
        ],
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },

  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   publicPath: "/dist/",
  //   filename: "[name].bundle.js",
  //   clean: true,
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js",
    // clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'), // Path to your HTML file
      filename: 'index.html',
      inject: 'body', // Injects your bundle at the bottom of the body
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/favicon.ico', to: 'favicon.ico' }, // Copy favicon
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
          enforce: true,
        },
        gallery: {
          test: /gallery/,
          name: 'gallery',
          chunks: 'all',
        },
        models: {
          test: /three-gallery/,
          name: 'three-gallery',
          chunks: 'all',
        }
      },
    },
  },
};

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // Enable multi-threaded processing
      }),
    ],
  },
};