const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./",
        watchContentBase: true,
        open: "Google Chrome"
    },
    plugins: [
        new Dotenv({
          path: path.resolve(__dirname,'src', './.env'),
          silent: process.env.NODE_ENV === 'production' }),
        // new DefinePlugin({
        //   'process.env.NODE_ENV': "production"
        // }),
      ],
});