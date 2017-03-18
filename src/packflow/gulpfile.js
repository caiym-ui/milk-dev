var gulp = require('gulp');
var webpack = require('webpack');
var spawn = require('cross-spawn');
var path = require('path');

var utils = require('../utils/');
var logger = utils.logger;
var webpackProdConfig = require('./webpack.prod.config');

gulp.task('start', function () {
  logger.info('--- Develop Start ---');
  require('./webpack.server');
});

gulp.task('build', function () {
  webpack(webpackProdConfig, function (err, stats) {
    if (err) {
      logger.warn(err);
      return;
    }

    logger.info(stats);
    logger.info('--- Build Done ---');
  });
});
