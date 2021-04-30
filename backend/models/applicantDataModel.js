const mongoose = require('mongoose');
const validator = require('validator');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

const applicantDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'please provide your first name'],
    minlength: 3,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: [true, 'please provide your last name'],
    minlength: 3,
    maxlength: 30,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'applicant data should belong to a user'],
  },
});

applicantDataSchema.plugin(mongoose_delete, {
  overrideMethods: 'all',
});

const ApplicantData = mongoose.model(
  constants.MODELS_NAMES.applicantData,
  applicantDataSchema
);

exports.ApplicantData = ApplicantData;
