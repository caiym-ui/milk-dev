'use strict';

var path = require('path');
var webpack = require('webpack');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

var _dirname = process.cwd();

module.exports = {
  entry: {
    bundle: [
      path.resolve(_dirname, './demo/'),
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
          {
            loader: require.resolve('postcss-loader'),
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
          },
          require.resolve('sass-loader')
        ],
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
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
