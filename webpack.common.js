const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var appBasePath = "./Scripts/App/";

var jsEntries = {};
fs.readdirSync(appBasePath).forEach(function(name) {
  var indexFile = appBasePath + name + "/index.js";
  if (fs.existsSync(indexFile)) {
    jsEntries[name] = indexFile;
  }
});

module.exports = {
  entry: jsEntries,
  output: {
    path: path.resolve(__dirname, "./wwwroot/js/bundle/"),
    publicPath: "/wwwroot/assets/",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.join(__dirname, appBasePath)
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: "file-loader",
        query: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ]
};
