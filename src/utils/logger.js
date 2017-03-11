var colors = require('colors/safe');

colors.setTheme({
  info: 'green',
  warn: 'yellow',
  help: 'cyan',
  error: 'red',
  debug: 'blue',
});

module.exports = {
  log: function (str) {
    console.log(str);
  },
  info: function (str) {
    console.log(colors.info(str));
  },
  warn: function (str) {
    console.log(colors.warn(str));
  },
  help: function (str) {
    console.log(colors.help(str));
  },
  error: function (str) {
    console.log(colors.error(str));
  },
  debug: function (str) {
    console.log(colors.debug(str));
  },
}
