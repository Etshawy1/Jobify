const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');
const _ = require('lodash');
const { Skill } = require('../models/skillModel');
const { User } = require('../models/userModel');
const helpers = require('./../utils/helper');
const { Language } = require('../models/languageModel');
const { JobTitle } = require('../models/jobTitlesModel');
const { Job } = require('../models/jobModel');
const { Category } = require('../models/categoryModel');
const { JobApplication } = require('../models/jobApplicationModel');
const mongoose = require('mongoose');

exports.addSkill = factory.createOne(Skill);
exports.updateSkill = factory.updateOne(Skill);
exports.deleteSkill = factory.deleteOne(Skill);

exports.addLanguage = factory.createOne(Language);
exports.deleteLanguage = factory.deleteOne(Language);
exports.updateLanguage = factory.updateOne(Language);

exports.addJobTitle = factory.createOne(JobTitle);
exports.updateJobTitle = factory.updateOne(JobTitle);
exports.deleteJobTitle = factory.deleteOne(JobTitle);

exports.addCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);

exports.getAppliedRecruiters = catchAsync(async (req, res, next) => {
  const skip = req.query.offset * 1 || 0;
  const limit = req.query.limit * 1 || 20;
  User.collection
    .find({ active: false })
    .skip(skip)
    .limit(limit)
    .toArray(async (err, documents) => {
      const totalCount = await User.collection.countDocuments({
        active: false
      });
      res.status(200).json(helpers.getPaging(documents, req, totalCount));
    });
});

exports.acceptRecruiter = catchAsync(async (req, res, next) => {
  try {
    await User.collection.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $set: { active: true } }
    );
    res.status(200).json({ data: 'success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ data: 'failed' });
  }
});

exports.rejectRecruiter = catchAsync(async (req, res, next) => {
  try {
    await User.collection.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    });
    res.status(200).json({ data: 'success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ data: 'failed' });
  }
});

exports.getCountJobs = catchAsync(async (req, res, next) => {
  let day = new Date();
  day.setDate(day.getDate() - 7);
  day = day.toISOString();

  const jobsLastWeak = await Job.find({
    createdAt: {
      $gte: day
    }
  });

  day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastMonth = await Job.find({
    createdAt: {
      $gte: day
    }
  });

  day = new Date();
  day.setFullYear(day.getFullYear() - 1);
  day = day.toISOString();

  const jobsLastYear = await Job.find({
    createdAt: {
      $gte: day
    }
  });
  res.status(200).json({
    jobsLastWeak: jobsLastWeak.length,
    jobsLastMonth: jobsLastMonth.length,
    jobsLastYear: jobsLastYear.length
  });
});
exports.getApplicantsCount = catchAsync(async (req, res, next) => {
  let day = new Date();
  day.setDate(day.getDate() - 7);
  day = day.toISOString();

  const jobsLastWeak = await JobApplication.find({
    $and: [
      { lastUpdate: { $gt: day } },
      { status: { $eq: 'In Consideration' } }
    ]
  });

  day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastMonth = await JobApplication.find({
    $and: [
      { lastUpdate: { $gt: day } },
      { status: { $eq: 'In Consideration' } }
    ]
  });
  day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastYear = await JobApplication.find({
    $and: [
      { lastUpdate: { $gt: day } },
      { status: { $eq: 'In Consideration' } }
    ]
  });
  res.status(200).json({
    jobsLastWeak: jobsLastWeak.length,
    jobsLastMonth: jobsLastMonth.length,
    jobsLastYear: jobsLastYear.length
  });
});

exports.getRejectedApplicantsCount = catchAsync(async (req, res, next) => {
  let day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastWeak = await JobApplication.find({
    $and: [{ lastUpdate: { $gt: day } }, { status: { $eq: 'Not Selected' } }]
  });
  day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastMonth = await JobApplication.find({
    $and: [{ lastUpdate: { $gt: day } }, { status: { $eq: 'Not Selected' } }]
  });
  day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastYear = await JobApplication.find({
    $and: [{ lastUpdate: { $gt: day } }, { status: { $eq: 'Not Selected' } }]
  });
  res.status(200).json({
    jobsLastWeak: jobsLastWeak.length,
    jobsLastMonth: jobsLastMonth.length,
    jobsLastYear: jobsLastYear.length
  });
});
