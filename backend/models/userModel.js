const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

/**
 * @module Models.user
 */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please provide your email'],
    minlength: 5,
    maxlength: 255,
    unique: [true, 'this email is already used'],
    lowercase: true,
    validate: [validator.isEmail, 'please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
    maxlength: 1024,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  type: {
    type: String,
    enum: [
      constants.USER_TYPES.APPLICANT,
      constants.USER_TYPES.RECRUITER,
      constants.USER_TYPES.ADMIN,
    ],
    defult: 'applicant',
  },
  additionalData: {
    type: mongoose.Schema.Types.ObjectId,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'onModel',
  },
  onModel: {
    type: String,
    enum: ['ApplicantData'],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  googleId: String,
  imageGoogleUrl: String,
  imageUrl: String,
  last_login: Date,
  active: {
    type: Boolean,
    defult: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // if password was not modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  /* istanbul ignore else */
  if (!this.isModified('password') || this.isNew) return next();

  /* istanbul ignore next */
  // to make sure the token is created after the password has been modified
  // because saving to the database is a bit slower than making the token
  this.passwordChangedAt = Date.now() - 1000;
  /* istanbul ignore next */
  next();
});

// to not get the inactive users from queries
// we use regex to make this function apply on all that start with 'find'
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({
    active: {
      $ne: false,
    },
  });
  next();
});

/**
 * this function is to compare a provided password with the stored one
 * @function correctPassword
 * @param {string} candidatePassword - the provided password to be checked
 * @param {string} userPassword - the hashed password of the user from the database
 * @returns {boolean} - true if the password matches the one in the database
 */

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/**
 * to check whether the password was changed after a given data.
 * @function changedPasswordAfter
 * @param {number} JWTTimestamp - the unix timestamp of when the jwt token was created.
 * @returns {boolean} - true if the password changed after the token was issued.
 */

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

/**
 * to make a JWT token for the user using the is as payload
 * @function signToken
 * @returns {string} - a json web token to identify the user and to be used in bearer token authorization
 */

userSchema.methods.signToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_VALID_FOR,
    }
  );
};

/**
 * creates a password reset token that is valid for 10 minutes only
 * @function createPasswordResetToken
 * @returns {string} - password reset token
 */

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // the token to reset the password is valit only for 10 minutes
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

userSchema.plugin(mongoose_delete, {
  overrideMethods: 'all',
});

const User = mongoose.model(constants.MODELS_NAMES.user, userSchema);

exports.User = User;
