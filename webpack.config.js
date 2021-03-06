const copyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');

module.exports = {
  entry: ["babel-polyfill", APP_PATH],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      { 
        test: /\.(ts|js)x?$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ , 
        options:{
          cacheDirectory:true
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ inject: true, template: path.join(APP_PATH, 'index.html') }),
    new ForkTsCheckerWebpackPlugin(),
    new copyWebpackPlugin({
      patterns: [
        { from: "src/images/", to: "images" },
      ],
    })
  ],

  performance: {
    hints: false
  },

  devServer: {
    host:"0.0.0.0",
    open: true,
    openPage:"http://localhost:3000",
    port:3000,
  },
};
