const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function (app) {
  app.use(cors());
  app.options('*', cors());
  app.use(helmet());
  /*const limiter = rateLimit({
    // only 1000 request from the same ip in 1 hour
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);*/
};
