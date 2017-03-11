#!/usr/bin/env node

'use strict';

var program = require('commander');

var pkg = require('../../package.json');
var utils = require('../utils');

var logger = utils.logger;

program
.version(pkg.version);

program
.command('run <task>')
.description('run specified task.')
.action(function (task) {
  if (!task) {
    logger.warn('please input task name.');
    return;
  }
  
  logger.info('--- Run "'+ task +'" Task ---');
  
  var gulp = require('gulp');
  require('../packflow/gulpfile');
  gulp.start(task);
});

program
.parse(process.argv);

var runCmd = program.runningCommand;
if (runCmd) {
  runCmd.on('close', process.exit.bind(process));
  runCmd.on('error', function () {
    process.exit(1);
  });
}
