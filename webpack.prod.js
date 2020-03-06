const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
             'API_KEY': JSON.stringify(process.env.API_KEY)
          }
        })
      ]
});