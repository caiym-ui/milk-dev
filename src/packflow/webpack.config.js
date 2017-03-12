'use strict';

var path = require('path');
var webpack = require('webpack');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

var _dirname = process.cwd();

module.exports = {
  entry: {
    bundle: [
      path.resolve(_dirname, './demo/'),
      "webpack/hot/dev-server",
      "webpack-dev-server/client?http://localhost:8080",
    ],
  },
  output: {
    path: path.resolve(_dirname, './build/'),
    publicPath: '/assets/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ["babel-preset-env", "babel-preset-es2015", "babel-preset-react"],
            babelrc: false,
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('postcss-pxtorem')({
                  rootValue: 100,
                  replace: true,
                  propList: ['*']
                })
              ];
            }
          }
        }, 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['babel-loader', 'rmc-svg-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: 'file-loader',
      }
    ]
  },
  externals: {
    'react': 'var React',
    'react-dom': 'var ReactDOM'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new openBrowserWebpackPlugin({
      url: 'http://localhost:8080'
    }),
  ],
}
