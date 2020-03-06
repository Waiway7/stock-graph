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
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false // Enable to remove warnings about conflicting order
          }),
          require("autoprefixer")
        ],
});