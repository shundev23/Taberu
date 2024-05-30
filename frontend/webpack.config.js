const path = require("path");
const webpack = require("webpack");

module.exports = {
   entry: "./src/index.js",
   output: {
       path: path.resolve(__dirname, "build"),
       filename: "[name].js",
   },
   module: {
       rules: [
           {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                   loader: "babel-loader",
               },
           },
           {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
           },
       ],
   },
   optimization: {
       minimize: true,
   },
   plugins: [
       new webpack.DefinePlugin({
           'APP_ENV' : JSON.stringify('production')
       })
   ]
}