'use strict';

var assign = require('object-assign');
var webpack = require('webpack');

var basicUtils = require('./basic');
var webpackConfig = require('./../packflow/webpack.config');

/**
 * get common karma config
 * @param {Object} options custom options
 */
function getCommonKarmaConfig(options) {
  var indexSpec = basicUtils.getFromCwd('tests/index.js');
  var files = [
    require.resolve('console-polyfill/index.js'),
    require.resolve('es5-shim/es5-shim.js'),
    require.resolve('es5-shim/es5-sham.js'),
    require.resolve('react/dist/react.js'),
    require.resolve('sinon/pkg/sinon.js'),
    indexSpec,
  ];
  var preprocessors = {};
  var webpackPlugins = [];

  preprocessors[indexSpec] = ['webpack'];

  return {
    reporters: ['mocha'],
    client: {
      mocha: {
        reporter: 'html',  // change Karma's debug.html to the mocha web reporter
        ui: 'bdd',
      }
    },
    frameworks: ['mocha'],
    files: files,
    preprocessors: preprocessors,
    webpack: assign(
      webpackConfig, {
        externals: {
          'sinon': 'var sinon',
          'react/addons': true,
          'react/lib/ExecutionEnvironment': true,
          'react-dom/test-utils': true,
          'react-test-renderer/shallow': true,
          'react/lib/ReactContext': 'window',
        },
        plugins: webpackPlugins
      }
    ),
    webpackServer: {
      noInfo: true,  // don't spam the console when running in karma!
    }
  };
}

module.exports = {
  getCommonKarmaConfig: getCommonKarmaConfig,
};