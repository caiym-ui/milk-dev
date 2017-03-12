var gulp = require('gulp');
var webpack = require('webpack');
var spawn = require('cross-spawn');
var path = require('path');

var utils = require('../utils/');
var logger = utils.logger;

gulp.task('start', function () {
  logger.info('--- Develop Start ---');
  require('./webpack.server');
});
