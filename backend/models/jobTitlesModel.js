const mongoose = require('mongoose');
const validator = require('validator');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

const jobTitleSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 300,
    unique: true
  }
});

jobTitleSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

const JobTitle = mongoose.model(
  constants.MODELS_NAMES.jobTitle,
  jobTitleSchema
);

exports.JobTitle = JobTitle;
