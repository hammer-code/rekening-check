const path = require('path');

 module.exports = {
    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.resolve(__dirname, 'bin'),
      filename: 'server.js'
     },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './bin'
     },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
     }
 };