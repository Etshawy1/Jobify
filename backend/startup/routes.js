const express = require('express');
const userRouter = require('../routes/userRouter');
const adminRouter = require('../routes/adminRouter');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');
const staticRouter = require('../routes/staticRouter');

module.exports = function (app) {
  app.set('trust proxy', 'loopback'); // for deployment to get the host in the code
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(
    express.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
      limit: '50mb'
    })
  );
  // serve static
  app.use('/api/v1/static', staticRouter);

  // rest of the routes
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/admins', adminRouter);

  /* istanbul ignore next */
  // if any link is visited and not mentioned above will go to that next middleware
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  app.use(globalErrorHandler);
};
