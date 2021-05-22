// Acknowledgments: code adapted from https://github.com/jonasschmedtmann/complete-node-bootcamp

module.exports.threeArg = fn => {
  return async (req, res, next) => {
    // catch rejected promise (inside a function that takes three arguments)
    // to the global error handling middleware
    await fn(req, res, next).catch(next);
  };
};

/* istanbul ignore next */
module.exports.fourArg = fn => {
  return (accessToken, freshToken, profile, done) => {
    // catch rejected promise (inside a function that takes three arguments)
    // to the global error handling middleware
    fn(accessToken, freshToken, profile, done).catch(done);
  };
};
