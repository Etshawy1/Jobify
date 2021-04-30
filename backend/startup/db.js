const mongoose = require('mongoose');

module.exports = function () {
  if (process.env.NODE_ENV == 'test') {
    mongoose
      .connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        __logger.info('DB connection successful! testing');
      })
      .catch((err) => {
        __logger.error(err);
        process.exit(1);
      });
  } else {
    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        __logger.info('DB connection successful! online');
      })
      .catch((err) => {
        __logger.error(err.message);
        const DBLocal = process.env.DATABASE_LOCAL;
        mongoose
          .connect(DBLocal, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
          })
          .then(() => {
            __logger.info('DB connection successful! local');
          })
          .catch((er) => {
            __logger.error(er.message);
            process.exit(); /* an agresive why to stop the application */
          });
      });
  }
};
