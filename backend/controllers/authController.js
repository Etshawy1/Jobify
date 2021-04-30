const crypto = require('crypto');
const { promisify } = require('util');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const { ApplicantData } = require('../models/applicantDataModel');
const catchAsync = require('../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const constants = require('../utils/constants');
/**
 * @module authController
 */

/**
 * sends response to the user
 * @param {object} user - user object retrieved from the database
 * @param {number} statusCode - the status code of the response
 * @param {object} res - the response object of express framework
 */
const createSendToken = (user, statusCode, res) => {
  const token = user.signToken();
  // Remove password and tracks from output
  user.password = undefined;
  user.__v = undefined;
  res.status(statusCode).json({
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // get the base url for the server
  const url = `${req.protocol}://${req.get('host')}`;
  // insert the user data in the database
  let newUser = await User.create({
    ..._.pick(req.body, ['email', 'password', 'type']),
    last_login: Date.now(),
    passwordConfirm: req.body.password,
    imageUrl: `${url}/api/v1/images/users/default.png`,
  });

  if (newUser.type === constants.USER_TYPES.APPLICANT) {
    const newApplicant = await ApplicantData.create({
      ..._.pick(req.body, ['firstName', 'lastName']),
      user: newUser._id,
    });
    newUser = await User.findByIdAndUpdate(
      {
        _id: newUser._id,
      },
      {
        additionalData: newApplicant._id,
        onModel: 'ApplicantData',
      },
      { new: true }
    ).populate({
      path: 'additionalData',
    });
  }
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // If everything ok, send token to client
  user.last_login = Date.now();
  await user.save({ validateBeforeSave: false });
  createSendToken(user, 200, res);
});

exports.googleOauth = catchAsync(async (req, res, next) => {
  /* istanbul ignore else */
  if (req.user.status === 201) {
    const url = `${req.protocol}://${req.get('host')}`;
    await new Email(req.user, url).sendWelcome();
  }
  const user = await User.findOne({ googleId: req.user.googleId })
    .select('+type')
    .select('+googleId');
  user.facebookId = undefined;
  user.imageFacebookUrl = undefined;
  user.password = undefined;
  user.tracks = undefined;
  user.ownedPlaylists = undefined;
  user.followedAlbums = undefined;
  user.followedTracks = undefined;
  user.followedUsers = undefined;
  user.followedUsers = undefined;
  user.queue = undefined;
  user.deleted = undefined;
  user.__v = undefined;
  createSendToken(user, req.user.status, res);
});

exports.protect = (blocking) => {
  return catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      if (blocking)
        return next(
          new AppError(
            'You are not logged in! Please log in to get access.',
            401
          )
        );
      else return next();
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }
    if (Date.now() > currentUser.preiumExpires) {
      currentUser.premium = false;
      currentUser.save({ validateBeforeSave: false });
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  });
};
exports.restrictTo = (...types) => {
  return (req, res, next) => {
    if (!types.includes(req.user.type)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false,
  });
  // 3) Send it to user's email
  try {
    const resetURL =
      `${req.protocol}://${req.hostname}` +
      `/password-reset/change/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({
      validateBeforeSave: false,
    });
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });
  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.emailConfirm = user.email;
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');
  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  // 3) If so, update password
  user.emailConfirm = user.email;
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!
  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
