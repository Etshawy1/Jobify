const winston = require('winston');
const morgan = require('morgan');

module.exports = function (app) {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
      winston.format.prettyPrint()
    ),
    transports: [
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      new winston.transports.File({
        filename: './logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: './logs/combined.log' }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: './logs/exceptions.log' }),
    ],
  });
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.simple()
        ),
      })
    );
  }
  /* istanbul ignore next */
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  app.use(
    morgan('combined', {
      stream: {
        write: function (message) {
          logger.info(message);
        },
      },
    })
  );

  global.__logger = logger;
};
