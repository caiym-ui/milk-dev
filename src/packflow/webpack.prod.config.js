'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var _dirname = process.cwd();

module.exports = {
  entry: {
    bundle: [
      path.resolve(_dirname, './src/'),
    ],
  },
  output: {
    path: path.resolve(_dirname, './build/'),
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
      root: path.resolve(_dirname, '..', '..'),
    }),
  ],
}
