const mongoose = require('mongoose');
const validator = require('validator');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

const jobTitlesSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    unique: true
  }
});

jobTitlesSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

const JobTitles = mongoose.model(
  constants.MODELS_NAMES.jobTitles,
  jobTitlesSchema
);

exports.JobTitles = JobTitles;
