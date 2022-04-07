const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const getAbsolutePath = pathDir => path.resolve(__dirname, pathDir);
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  name: "boilerplate",
  entry: {
    app: "./src/index.tsx",
  },

  externals: {
    axios: "axios",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      src: getAbsolutePath("src"),
      api: getAbsolutePath("src/api"),
      assets: getAbsolutePath("src/assets"),
      components: getAbsolutePath("src/components"),
      hooks: getAbsolutePath("src/hooks"),
      modules: getAbsolutePath("src/modules"),
      pages: getAbsolutePath("src/pages"),
      style: getAbsolutePath("src/assets/style"),
      utils: getAbsolutePath("src/utils"),
      hoc: getAbsolutePath("src/hoc"),
      router: getAbsolutePath("src/router"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
            "@babel/preset-typescript",
            [
              "@babel/preset-env",
              {
                modules: false,
                targets: {
                  browsers: ["last 2 versions", ">= 5% in KR"],
                },
              },
            ],
          ],
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              {
                corejs: 3,
                proposals: true,
              },
            ],
            "@babel/plugin-syntax-dynamic-import",
          ],
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/axios/dist/axios.min.js",
          to: "./axios.min.js",
        },
      ],
    }),
  ],

  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin(), new TerserPlugin()],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },

  output: {
    filename: "[name].bundle.[hash].js",
    path: getAbsolutePath("dist"),
    clean: true,
  },
};
