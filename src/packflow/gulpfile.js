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
var basicUtils = utils.basic;
var packageInfo = basicUtils.getPackageInfo();

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
      logger.success('Develop server reload...');
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
        logger.success('Develop server start...');
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
    logger.success('--- Build done ---');
  });
});

gulp.task('publish', function () {
  logger.info('--- Build file before publish ---');
  webpack(webpackProdConfig, function (err, stats) {
    if (err) {
      logger.warn(err);
      return;
    }

    logger.success('--- Build done ---');
    basicUtils.getCurrentBranch().then(function (branch) {
      inquirer.prompt([{
        name: 'version',
        message: 'input 📦 version info, it should be "x.x.x" or "x.x.x-beta.x"',
        default: packageInfo.version,
        validate: function (input) {
          var reg = new RegExp('^\\d+\\.\\d+\\.\\d+(\\w+\\.\\d+)?$');
          if (!reg.test(input)) {
            logger.warn('invalid version info, it should be "x.x.x" or "x.x.x-beta.x"')
            return false;
          }
          return true;
        }
      }]).then(function (answers) {
        if (packageInfo.version !== answers.version) {
          packageInfo.version = answers.version;

          logger.info('');
          logger.info('--- Write new version info to package.json ---');
          logger.info('');
          fs.writeFileSync(path.resolve('package.json'), JSON.stringify(packageInfo, null, '  '), 'utf8');
        }

        logger.info('');
        logger.info('--- Package push origin: '+ branch +' ---');
        logger.info('');
        spawn.sync('git', ['add', '.'], { stdio: 'inherit' });
        spawn.sync('git', ['commit', '-m', 'ver. ' + packageInfo.version], { stdio: 'inherit' });
        spawn.sync('git', ['push', 'origin', branch], { stdio: 'inherit' });

        logger.info('');
        logger.info('--- Package publish, version: '+ packageInfo.version +' ---');
        logger.info('');
        spawn.sync('npm', ['publish'], { stdio: 'inherit' });
      })
    })
  });
})
