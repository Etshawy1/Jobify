const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

module.exports = function (app) {
  app.use(mongoSanitize());
  app.use(xss());
  // in the whitelist array put all the variables that you permit it having Duplicates for any reason
  app.use(hpp({ whitelist: [] }));
};
