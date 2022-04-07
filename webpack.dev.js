const { merge, mergeWithRules } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const babelPlugins = common.module.rules[0].options.plugins;
babelPlugins.push("react-refresh/babel");
babelPlugins.push("babel-plugin-styled-components");

const webpackDevConfig = {
  mode: "development",
  devtool: "inline-source-map",

  plugins: [
    new HtmlWebpackPlugin({
      title: "개발 서버",
      template: "./public/index.html",
    }),
    new ReactRefreshWebpackPlugin(),
  ],

  devServer: {
    port: 3000,
    open: false,
    static: "./dist",
    historyApiFallback: true,
  },
};

module.exports = merge(common, webpackDevConfig);
