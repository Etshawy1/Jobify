const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');
const _ = require('lodash');
const { Skill } = require('../models/skillModel');
const { Language } = require('../models/languageModel');
const { JobTitle } = require('../models/jobTitlesModel');
const { Job } = require('../models/jobModel');
const { Category } = require('../models/categoryModel');
const { JobApplication } = require('../models/jobApplicationModel');

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
exports.updateCategory = factory.updateOne(Skill);
exports.deleteCategory = factory.deleteOne(Category);

exports.getCountJobs = catchAsync(async (req, res, next) => {
  let day = new Date();
  day.setDate(day.getDate() - 7);
  day = day.toISOString();
  const d = await Job.find({});
  console.log(d.length);

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

  const jobsLastYeas = await Job.find({
    createdAt: {
      $gte: day
    }
  });
  res.status(200).json({
    jobsLastWeak: jobsLastWeak.length,
    jobsLastMonth: jobsLastMonth.length,
    jobsLastYeas: jobsLastYeas.length
  });
});
exports.getApplicantsCount = catchAsync(async (req, res, next) => {
  let day = new Date();
  day.setDate(day.getDate() - 7);
  day = day.toISOString();

  const jobsLastWeak = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: day
      },
      status: {
        $eq: 'In Consideration'
      }
    }
  });

  day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastMonth = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: day
      },
      status: {
        $eq: 'In Consideration'
      }
    }
  });
  day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastYeas = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: day
      },
      status: {
        $eq: 'In Consideration'
      }
    }
  });
  res.status(200).json({
    jobsLastWeak: jobsLastWeak.length,
    jobsLastMonth: jobsLastMonth.length,
    jobsLastYeas: jobsLastYeas.length
  });
});

exports.getRejectedApplicantsCount = catchAsync(async (req, res, next) => {
  let day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastWeak = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: day
      },
      status: {
        $eq: 'Not Selected'
      }
    }
  });
  day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastMonth = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: day
      },
      status: {
        $eq: 'Not Selected'
      }
    }
  });
  day = new Date();
  day.setMonth(day.getMonth() - 1);
  day = day.toISOString();

  const jobsLastYeas = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: day
      },
      status: {
        $eq: 'Not Selected'
      }
    }
  });
  res.status(200).json({
    jobsLastWeak: jobsLastWeak.length,
    jobsLastMonth: jobsLastMonth.length,
    jobsLastYeas: jobsLastYeas.length
  });
});
