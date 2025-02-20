const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const alias = {
  "@": path.resolve(__dirname, "src/"),
};

module.exports = {
  entry: {
    background: path.join(__dirname, "src", "background", "interceptor.js"),
    content: path.join(__dirname, "src", "content", "index.js"),
    dashboard: path.join(__dirname, "src", "dashboard", "index.js"),
    popup: path.join(__dirname, "src", "popup", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, path.join("dist")),
    filename: "[name].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {targets: "defaults"}],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias,
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/icons/icon128.png",
          to: path.join(__dirname, "dist"),
          force: true,
        },
        {
          from: "src/content/content.css",
          to: path.join(__dirname, "dist"),
          force: true,
        },
        {
          from: "src/manifest.json",
          to: path.join(__dirname, "dist", "manifest.json"),
          force: true,
          toType: "file",
          transform(content) {
            const manifestObj = {
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString()),
            };

            if (manifestObj.version.includes("-")) {
              const [version, preRelease] = manifestObj.version.split("-");
              manifestObj.version = version;
            }

            return Buffer.from(JSON.stringify(manifestObj));
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup", "index.html"),
      filename: "popup.html",
      chunks: ["popup"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "options", "index.html"),
      filename: "options.html",
      chunks: ["options"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "dashboard", "index.html"),
      filename: "newtab.html",
      chunks: ["dashboard"],
      cache: false,
    }),
  ],
};
