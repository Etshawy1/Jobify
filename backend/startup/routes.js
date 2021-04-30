const express = require('express');
const userRouter = require('../routes/userRouter');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');
const staticImages = require('../routes/images');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.set('trust proxy', 'loopback'); // for deployment to get the host in the code
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.use(
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
      limit: '50mb',
    })
  );
  // serve static
  app.use('/api/v1/images', staticImages);
  app.use(
    '/api/v1/browse/categories/images',
    express.static('assets/images/categories')
  );

  // rest of the routes
  app.use('/api/v1/users', userRouter);

  /* istanbul ignore next */
  // if any link is visited and not mentioned above will go to that next middleware
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  app.use(globalErrorHandler);
};
