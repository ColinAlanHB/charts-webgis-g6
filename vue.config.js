const packageName = require("./package.json").name;
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const devtool = process.env.NODE_ENV === "development" ? "source-map" : "nosources-source-map";
const publicPath = "./";

module.exports = {
  publicPath,
  productionSourceMap: false,
  lintOnSave: true,
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT",
      "Access-Control-Allow-Credentials": "true",
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
    config.module
      .rule("fonts")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        options.fallback.options.publicPath = publicPath;
        return options;
      })
      .end();
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        options.fallback.options.publicPath = publicPath;
        return options;
      })
      .end();
    config.module
      .rule("media")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        options.fallback.options.publicPath = publicPath;
        return options;
      })
      .end();
    config.module
      .rule("svg")
      .use("file-loader")
      .loader("file-loader")
      .tap((options) => {
        options.publicPath = publicPath;
        return options;
      })
      .end();
  },
  configureWebpack() {
    return {
      devtool,
      output: {
        library: packageName,
        libraryTarget: "umd",
        jsonpFunction: `webpackJsonp_${packageName}`,
      },
    };
  },
};
