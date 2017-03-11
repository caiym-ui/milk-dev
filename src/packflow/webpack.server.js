var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config');
var path = require('path');

var compiler = webpack(config);

var server = new webpackDevServer(compiler, {
  hot: true,
  publicPath: '/assets/',
});

server.listen(8080, 'localhost', function () {});
