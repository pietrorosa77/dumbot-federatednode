import path from "path";
import { Configuration, container } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
const deps = require("./package.json").dependencies;

const config: Configuration = {
  mode: "production",
  entry: "./index.ts",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: "DumbotFederatedModulesScope",
      filename: "remoteEntry.js",
      exposes: {
        "./RemoteNodeExample": "./src/DumbotRemoteComponent.tsx",
      },
      shared: [
        {
          react: { singleton: true, requiredVersion: deps.react },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
          grommet: {
            singleton: true,
            requiredVersion: deps.grommet,
          },
          lodash: {
            singleton: true,
            requiredVersion: deps.lodash,
          },
          "grommet-icons": {
            singleton: true,
            requiredVersion: deps["grommet-icons"],
          },
          nanoid: {
            singleton: true,
            requiredVersion: deps.nanoid,
          },
          "styled-components": {
            singleton: true,
            requiredVersion: deps["styled-components"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CleanWebpackPlugin(),
  ],
};

export default config;
