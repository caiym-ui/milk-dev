'use strict';

var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var spawn = require('cross-spawn');
var browserSync = require('browser-sync').create();
var inquirer = require('inquirer');

var utils = require('../utils/');
var webpackConfig = require('./webpack.config');
var webpackProdConfig = require('./webpack.prod.config');

var logger = utils.logger;
var packageInfo = utils.basic.getPackageInfo();

var __dirname = process.cwd();
var SRC_PATH = path.join(__dirname, 'src');
var DEMO_PATH = path.join(__dirname, 'demo');

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
      logger.success('=== Server: reload ===');
      logger.info('');
    } else {
      serverStart = true;
      browserSync.init({
        port: 8080,
        server: {
          baseDir: __dirname,
          index: 'index.html',
        },
        reloadDebounce: 500,
      }, function () {
        logger.info('');
        logger.success('=== Server: start ===');
        logger.info('');
      })
    }
  })
});

gulp.task('start', ['server'], function () {
  gulp.watch([path.join(SRC_PATH, '**', '*')], ['server']);
  gulp.watch([path.join(DEMO_PATH, '**', '*')], ['server']);
})

gulp.task('build', function () {
  logger.info('');
  logger.info('=== Build: start ===');
  logger.info('');
  webpack(webpackProdConfig, function (err, stats) {
    if (err) {
      logger.warn(err);
      return;
    }

    logger.info('');
    logger.success('=== Build: done ===');
    logger.info('');
  });
});

gulp.task('publish', function () {
  logger.info('');
  logger.info('=== Publish: build file before ===');
  webpack(webpackProdConfig, function (err, stats) {
    if (err) {
      logger.warn(err);
      return;
    }

    logger.success('=== Publish: build file done ===');
    logger.info('');
    utils.basic.getCurrentBranch().then(function (branch) {
      inquirer.prompt([{
        name: 'version',
        message: 'input 📦 version info, it should be "x.x.x" or "x.x.x-beta.x"',
        default: packageInfo.version,
        validate: function (input) {
          var reg = new RegExp('^\\d+\\.\\d+\\.\\d+(-\\w+\\.\\d+)?$');
          if (!reg.test(input)) {
            logger.warn('=== invalid version info, it should be "x.x.x" or "x.x.x-beta.x"')
            return false;
          }
          return true;
        }
      }]).then(function (answers) {
        if (packageInfo.version !== answers.version) {
          logger.info('=== Publish: write new version info to package.json ===');
          logger.info('');
          packageInfo.version = answers.version;
          fs.writeFileSync(
            path.resolve('package.json'),
            JSON.stringify(packageInfo, null, '  '),
            'utf8');
        }
        
        logger.info('=== Publish: push code to origin: '+ branch +' ===');
        logger.info('');
        spawn.sync('git', ['add', '.'], { stdio: 'inherit' });
        spawn.sync('git', ['commit', '-m', 'Chore: new version ' + packageInfo.version], { stdio: 'inherit' });
        spawn.sync('git', ['push', 'origin', branch], { stdio: 'inherit' });
        
        logger.info('');
        logger.info('=== Publish: publish npm package, version: '+ packageInfo.version +' ===');
        logger.info('');
        spawn.sync('npm', ['publish'], { stdio: 'inherit' });
      })
    })
  });
})
