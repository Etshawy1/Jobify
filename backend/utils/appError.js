// Acknowledgments: code adapted from https://github.com/jonasschmedtmann/complete-node-bootcamp

/**
 * Class contains errors that happen in the application with custom message and status code.
 * @extends Error
 */
class AppError extends Error {
  /**
   * Create a custom error object.
   * @param {string} message - The message explaining the error.
   * @param {number} statusCode - The statusCode of the HTTP response.
   * @returns {void}
   */
  constructor(message, statusCode) {
    super(message);
    this.msg = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
