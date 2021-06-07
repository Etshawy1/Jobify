const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

const jobApplicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: constants.MODELS_NAMES.user,
    required: [true, 'applcation should belong to an applicant'],
  },
  status: {
    type: String,
    enum: ['applied', 'In Consideration', 'Not Selected'],
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: constants.MODELS_NAMES.job,
    required: [true, 'application should belon to a job'],
  },
  questionsAnswers: [String],
  lastUpdate: Date,
});

jobApplicationSchema.plugin(mongoose_delete, {
  overrideMethods: 'all',
});

const JobApplication = mongoose.model(
  constants.MODELS_NAMES.jobApplication,
  jobApplicationSchema
);

exports.JobApplication = JobApplication;
