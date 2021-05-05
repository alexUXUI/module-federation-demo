const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "esbuild-loader",
      },
      {
        test: /\.jsx$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx",
          target: "es2015",
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Games",
      remotes: {
        GameOfLife: `GameOfLife@http://localhost:3001/remoteEntry.js`,
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
