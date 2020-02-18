const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: './src/js/index.js',
    styles: './src/style.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        rules: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader", options: { url: false, sourceMap: true }
          },
          {
            loader: "postcss-loader", options: { sourceMap: true }
          },
          {
            loader: "sass-loader", options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      // jquery: path.resolve(__dirname, 'js/vendors/jquery-3.3.1.min.js'),
    }
  },
  externals: {
    jquery: 'jQuery'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]src[\\/]js[\\/]vendors[\\/]/,
          name: 'vendors',
          filename: '[name].bundle.js',
          chunks: 'all'
        },
        styles: {
          test: /\.(sa|sc|c)ss$/,
          name: 'styles',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /vendors$/
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};