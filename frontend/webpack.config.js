const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'APP_ENV': JSON.stringify('production')
    })
  ],
  performance: {
    hints: 'warning',
    maxAssetSize: 244000, // 244 KiB
    maxEntrypointSize: 244000, // 244 KiB
  }
};
