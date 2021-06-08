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
exports.deleteSkill = factory.createOne(Skill);

exports.addLanguage = factory.createOne(Language);
exports.deleteLanguage = factory.deleteOne(Language);

exports.addJobTitle = factory.createOne(JobTitle);

exports.deleteJobTitle = factory.createOne(JobTitle);

exports.addCategory = factory.createOne(Category);

exports.deleteCategory = factory.createOne(Category);
exports.updateSkill = factory.createOne(Skill);
exports.getCountJobs = catchAsync(async (req, res, next) => {
  let today = new Date().toISOString();

  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  );
  today = new Date().toISOString();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate() + 1
  );
  today = new Date().toISOString();

  const lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate() + 1
  );
  const jobsLastWeak = await Job.find({
    createdAt: {
      $gt: lastWeek
    }
  });
  const jobsLastMonth = await Job.find({
    createdAt: {
      $gt: lastMonth
    }
  });
  const jobsLastYeas = await Job.find({
    createdAt: {
      $gt: lastYear
    }
  });
  res.status(200).json({
    jobsLastWeak: jobsLastWeak.length,
    jobsLastMonth: jobsLastMonth.length,
    jobsLastYeas: jobsLastYeas.length
  });
});
exports.getApplicantsCount = catchAsync(async (req, res, next) => {
  let today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  );
  today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate() + 1
  );
  today = new Date();

  const lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate() + 1
  );
  console.log(lastWeek);
  console.log(lastMonth);
  console.log(lastYear);
  const jobsLastWeak = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: lastWeek
      },
      status: {
        $eq: 'In Consideration'
      }
    }
  });
  const jobsLastMonth = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: lastMonth
      },
      status: {
        $eq: 'In Consideration'
      }
    }
  });
  const jobsLastYeas = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: lastYear
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
  let today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  );
  today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate() + 1
  );
  today = new Date();

  const lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate() + 1
  );
  console.log(lastWeek);
  console.log(lastMonth);
  console.log(lastYear);
  const jobsLastWeak = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: lastWeek
      },
      status: {
        $eq: 'Not Selected'
      }
    }
  });
  const jobsLastMonth = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: lastMonth
      },
      status: {
        $eq: 'Not Selected'
      }
    }
  });
  const jobsLastYeas = await JobApplication.find({
    $and: {
      lastUpdate: {
        $gt: lastYear
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
