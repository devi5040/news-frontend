const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_TOKEN": JSON.stringify(
        process.env.REACT_APP_TOKEN
      ),
    }),
  ],
};
