const { User } = require('./../models/userModel');
const { RecruiterData } = require('../models/recruiterDataModel');
const { JobApplication } = require('../models/jobApplicationModel');
const { Job } = require('../models/jobModel');
const _ = require('lodash');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const helpers = require('./../utils/helper');
const path = require('path');
const catchAsync = require('./../utils/catchAsync').threeArg;

exports.updateData = catchAsync(async (req, res, next) => {
  const recruiterData = await RecruiterData.findByIdAndUpdate(
    { _id: req.user.additionalData._id },
    {
      ..._.pick(req.body, [
        'name',
        'address',
        'employeesCount',
        'field',
        'description'
      ])
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(recruiterData);
});

exports.updatePicture = catchAsync(async (req, res, next) => {
  // check if file is missing
  if (!req.file || !req.file.buffer) {
    return next(new AppError('image file is missing', 400));
  }

  // save the image and get its name
  const newImageName = await helpers.prepareAndSaveImage(
    req.file.buffer,
    path.resolve(__dirname, '..') + '/assets/images/companies'
  );

  // update image url in the database
  const url = `${req.protocol}://${req.get('host')}`;
  const image = `${url}/api/v1/static/images/companies/${newImageName}`;
  await User.findByIdAndUpdate(req.user._id, {
    imageUrl: image
  });
  res.status(200).json({ image });
});

exports.profilePictureMultipart = catchAsync(async (req, res, next) => {
  helpers.getMultiPart(
    true,
    path.resolve(__dirname, '..') + '/assets/images/companies'
  )(req, res, next);
});

exports.jopStatus = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.body.job);
  if (job._id != req.user.id) {
    return next(new AppError('you are not authorized to do this.', 401));
  }
  const application = await JobApplication.findOneAndUpdate(
    { applicant: req.body.applicant, Job: req.body.Job },
    { status: req.body.status }
  );
  res.status(201).json({ application });
});
