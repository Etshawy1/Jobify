const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');
const _ = require('lodash');
const helpers = require('./../utils/helper');
const { Job } = require('../models/jobModel');

exports.createJob = catchAsync(async (req, res, next) => {
  req.body.recruiter = req.user._id;
  req.body.createdAt = Date.now();
  const job = await Job.create(req.body);
  res.status(201).json(job);
});

exports.getRecruiterJobs = catchAsync(async (req, res, next) => {
  const query = { recruiter: req.params.id };
  const features = new APIFeatures(Job.find(query), req.query)
    .filter()
    .offset();
  const jobs = await features.query;
  const totalCount = await Job.find(query).countDocuments();
  res.status(200).json(helpers.getPaging(jobs, req, totalCount));
});

exports.updateJob = factory.updateOne(Job);
exports.deleteJob = factory.softDelete(Job);
exports.getJob = factory.getOne(Job);
exports.getAllJobs = factory.getAll(Job, {
  path: 'recruiter',
  populate: {
    path: 'additionalData',
    select: 'name'
  }
});
