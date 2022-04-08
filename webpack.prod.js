const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const babelPlugins = common.module.rules[0].options.plugins;
babelPlugins.push(["transform-remove-console", { exclude: ["error", "warn"] }]);

const webpackProdConfig = {
  mode: "production",
  devtool: "source-map",

  plugins: [
    new HtmlWebpackPlugin({
      title: "product",
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(common, webpackProdConfig);
