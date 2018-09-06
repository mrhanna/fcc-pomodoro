 const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');

 module.exports = {
   entry: {
     pomodoro: './src/main.js'
   },
   plugins: [
     new CleanWebpackPlugin(['dist'])
   ],
   output: {
     filename: '[name].[contenthash].bundle.js',
     path: path.resolve(__dirname, 'dist')
   },
   module: {
     rules: [
       {
         loader: 'babel-loader',
         test: /\.js$/
       }
     ]
   }
 };
