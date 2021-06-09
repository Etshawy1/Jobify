const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');
const helpers = require('./../utils/helper');
const { JobApplication } = require('./../models/jobApplicationModel');

exports.makeUserJobApplications = catchAsync(async (req, res, next) => {
  if (!req.body.questionsAnswers) {
    return next(new AppError('you must answer the question', 400));
  }
  const application = await JobApplication.create({
    applicant: req.user._id,
    status: 'applied',
    job: req.body.job,
    questionsAnswers: req.body.questionsAnswers,
    lastUpdate: Date.now()
  });
  res.status(200).json(application);
});

exports.getAllJobApplications = factory.getAll(JobApplication, {
  path: 'applicant job',
  populate: {
    path: 'additionalData recruiter',
    populate: {
      path: 'additionalData'
    }
  }
});

exports.updateUserJobApplication = factory.updateOne(
  JobApplication,
  {
    path: 'applicant job',
    populate: {
      path: 'additionalData recruiter',
      populate: {
        path: 'additionalData'
      }
    }
  },
  { lastUpdate: Date.now() }
);
