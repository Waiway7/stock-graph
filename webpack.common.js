const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const outputDir = "./dist";
// const Dotenv = require('dotenv').config(path.resolve(__dirname,'src', './.env'));
const Dotenv = require('dotenv-webpack');
// const { DefinePlugin } = require('webpack'); 

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, "src", "index.js")], //
  output: {
    path: path.join(__dirname, outputDir),
    filename: "main.js",
    publicPath: "/dist/"
  },
  resolve: {
    extensions: [".js"] // if we were using React.js, we would include ".jsx"
  },
  module: {
    rules: [
      {
        parser: {
          amd: false
        },
        test: /\.js$/, // if we were using React.js, we would use \.jsx?$/
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-proposal-optional-chaining"],
            ["@babel/plugin-transform-runtime",
            {
              "regenerator": true
            }
          ]],
            exclude: /node_modules/
          } // if we were using React.js, we would include "react"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [

    // new DefinePlugin({
    //   'process.env.NODE_ENV': "production"
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    require("autoprefixer")
  ],
 
};
