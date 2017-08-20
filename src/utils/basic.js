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
  },
  getFromCwd: function () {
    var args = [].slice.call(arguments);

    args.unshift(process.cwd());
    return path.join.apply(path, args);
  },
  runCMD: function (cmd, args, fn, stdoutFn) {
    args = args || [];
    var runner = require('child_process').spawn(
      cmd, args, {
        // keep color
        stdio: stdoutFn ? 'pipe' : 'inherit'
      }
    );

    if (stdoutFn) {
      runner.stdout.on('data', function (data) {
        stdoutFn(data.toString());
      });
    }
    runner.on('close', function (code) {
      if (fn && typeof fn === 'function') {
        fn(code);
      }
    });
  }
}
