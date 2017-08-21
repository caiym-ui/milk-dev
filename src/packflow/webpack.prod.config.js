'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var DIR_PATH = process.cwd();

module.exports = {
  entry: {
    bundle: [
      path.resolve(DIR_PATH, './src/'),
    ],
  },
  output: {
    path: path.resolve(DIR_PATH, './build/'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
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
          loader: require.resolve('babel-loader'),
          query: {
            presets: ['env', 'react', 'es2015', 'stage-1'].map(function(item) {
                        return require.resolve('babel-preset-' + item);
                    }),
            babelrc: false,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader')
        ]
      },
      {
        test: /\.svg$/,
        use: [
          require.resolve('svg-sprite-loader'),
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: require.resolve('file-loader'),
      }
    ]
  },
  externals: {
    'react': 'var React',
    'react-dom': 'var ReactDOM'
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(DIR_PATH, '..', '..'),
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      },
      "__PROD__": true,
    }),
    new UglifyJSPlugin(),
  ],
}
