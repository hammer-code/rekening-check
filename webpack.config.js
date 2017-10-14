const path = require('path');

 module.exports = {
    entry: {
      app: './src/app.js'
    },
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'bin'),
      filename: 'server.js'
     },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './bin'
     },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        { 
          test: /\.json$/, 
          loader: 'json-loader' 
        }
      ]
    },
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
 };