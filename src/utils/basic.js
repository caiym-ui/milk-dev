var path = require('path');
var gitRev = require('git-rev');

var DIR_PATH = process.cwd();
var packageInfo = require(path.join(DIR_PATH, 'package.json'));

module.exports = {
  getCurrentBranch: function () {
    return new Promise(function (resolve, reject) {
      gitRev.branch(function (str) {
        resolve(str || 'master');
      })
    });
  },
  getPackageInfo: function () {
    return packageInfo;
  }
}
