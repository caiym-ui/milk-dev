var assign = require('object-assign');
var getCommonKarmaConfig = require('./getCommonKarmaConfig');

/**
 * PhantomJS Karma config.set
 */
module.exports = function (config) {
  var commonKarmaConfig = getCommonKarmaConfig();
  var phantomjsConfig = {
    browsers: ['PhantomJS_custom'],
    singleRun: true,
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 1920,
            height: 1080,
          },
          scrollPostion: {
            top: 100,
            left: 0,
          }
        },
        flags: ['--load-images=true'],
        debug: true,
      }
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered
      // (useful if karma exits without killing phantom)
      exitOnResourceError: true,
    }
  }

  // assign config for config.set
  config.set(assign(commonKarmaConfig, phantomjsConfig));
};