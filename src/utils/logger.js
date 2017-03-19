var colors = require('colors/safe');

colors.setTheme({
  success: 'green',
  warn: 'yellow',
  help: 'cyan',
  error: 'red',
  debug: 'blue',
});

module.exports = {
  info: function (str) {
    console.log(str);
  },
  success: function (str) {
    console.log(colors.success(str));
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
