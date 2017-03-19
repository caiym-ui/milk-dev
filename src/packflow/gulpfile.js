var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var spawn = require('cross-spawn');
var browserSync = require('browser-sync').create();

var utils = require('../utils/');
var webpackConfig = require('./webpack.config');
var webpackProdConfig = require('./webpack.prod.config');

var logger = utils.logger;

var DIR_PATH = process.cwd();
var SRC_PATH = path.join(DIR_PATH, 'src');
var DEMO_PATH = path.join(DIR_PATH, 'demo');

var serverStart = false;
gulp.task('server', function () {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      logger.warn(err);
      return;
    }

    if (serverStart) {
      browserSync.reload();
      logger.info('');
      logger.success('Develop Server Reload...');
    } else {
      serverStart = true;
      browserSync.init({
        port: 8080,
        server: {
          baseDir: DIR_PATH,
          index: 'index.html',
        },
        reloadDebounce: 500,
      }, function () {
        logger.info('');
        logger.success('Develop Server Start...');
      })
    }
  })
});

gulp.task('start', ['server'], function () {
  gulp.watch([path.join(SRC_PATH, '**', '*')], ['server']);
  gulp.watch([path.join(DEMO_PATH, '**', '*')], ['server']);
})

gulp.task('build', function () {
  webpack(webpackProdConfig, function (err, stats) {
    if (err) {
      logger.warn(err);
      return;
    }

    logger.info(stats);
    logger.success('--- Build Done ---');
  });
});
