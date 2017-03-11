var gulp = require('gulp');
var webpack = require('webpack');
var spawn = require('cross-spawn');

var webpackServer = require('./webpack.server');
var utils = require('../utils/');
var logger = utils.logger;

gulp.task('start', function () {
  logger.info('--- Develop Start ---');
  spawn('node', ['./webpack.server.js'], { stdio: 'inherit' });
});
