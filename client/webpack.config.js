const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
});

const modules = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
    },
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
      resolve: { extensions: [".js", ".jsx"] },
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: ["url-loader?limit=10000", "img-loader"],
    },
  ],
};

const resolve = {
  modules: [path.resolve(`${__dirname}/src`), path.resolve(`${__dirname}/node_modules`)],
  extensions: [".jsx", ".js"],
  /*=================================================================================
   ANCHOR alias to prevent nested dot imports, mostly for non module paths.
  ===================================================================================*/
  alias: {
    Components: path.resolve(__dirname, "src/components/"),
    CommonComponents: path.resolve(__dirname, "src/components/common/"),
    Constants: path.resolve(__dirname, "src/constants/"),
    Utils: path.resolve(__dirname, "src/utils/"),
    Modules: path.resolve(__dirname, "src/modules/"),
    Hooks: path.resolve(__dirname, "src/hooks/"),
    Store: path.resolve(__dirname, "src/store/"),
    Css: path.resolve(__dirname, "src/assets/css/"),
    Animations: path.resolve(__dirname, "src/assets/animations/"),
    Validations: path.resolve(__dirname, "src/validations/"),
    Locales: path.resolve(__dirname, "src/locales/"),
  },
};

module.exports = (env = {}) => {
  const mode = env.mode;

  const isProduction = mode === "production";

  const envFilePath = isProduction ? path.resolve(__dirname, "./prod.env") : path.resolve(__dirname, "./dev.env");
  const fileEnv = dotenv.config({ path: envFilePath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  envKeys["process.env.VERSION"] = JSON.stringify(process.env.npm_package_version);

  if (!isProduction && env.API_BASE_URL) {
    /*=================================================================================
    ANCHOR if we have multiple test env we can pass different API_BASE_URL.  
   ===================================================================================*/
    envKeys["API_BASE_URL"] = env.API_BASE_URL;
  }

  return {
    entry: "./src/index.jsx",
    output: {
      path: path.resolve("dist"),
      filename: "bundle.js",
      chunkFilename: "[name].[chunkhash].js",
      publicPath: "/",
    },
    module: modules,
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new CopyWebpackPlugin([{ from: "src/assets/images", to: "images/" }, "src/manifest.json", "src/sw.js", "src/robots.txt"]),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$/,
      }),
      htmlPlugin,
    ],
    resolve: resolve,
    devServer: { historyApiFallback: true },
  };
};
