const { User } = require('./../models/userModel');
const { Skill } = require('./../models/skillModel');
const { Language } = require('./../models/languageModel');
const { JobTitle } = require('../models/jobTitlesModel');
const { ApplicantData } = require('./../models/applicantDataModel');
const { JobApplication } = require('../models/jobApplicationModel');
const { Category } = require('./../models/categoryModel');
const _ = require('lodash');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const helpers = require('./../utils/helper');
const path = require('path');

const catchAsync = require('./../utils/catchAsync').threeArg;

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('additionalData');
  res.status(200).json(user);
});

exports.updateData = catchAsync(async (req, res, next) => {
  const applicantData = await ApplicantData.findByIdAndUpdate(
    { _id: req.user.additionalData._id },
    {
      ..._.pick(req.body, [
        'firstName',
        'lastName',
        'gender',
        'dateOfBirth',
        'phone'
      ])
    },
    { new: true, runValidators: true }
  );
  // await new Email(newUser, url).sendWelcome();
  res.status(200).json(applicantData);
});

exports.updateSkills = catchAsync(async (req, res, next) => {
  const skillId = await Skill.findOne({ name: req.body.skillName });
  if (!skillId) return next(new AppError('This is not a skill!', 400));
  const skills = req.user.additionalData.skills;
  for (let i = 0; i < skills.length; i++) {
    if (skills[i].skill === req.body.skillName)
      return next(new AppError('skill aleardy added!', 400));
  }
  const applicantData = await updateModelData(req.user.additionalData._id, {
    skills: {
      skill: skillId.name,
      yearsExperiance: req.body.yearOfExperiance
    }
  });
  res.status(200).json(applicantData);
});

exports.deleteSkills = catchAsync(async (req, res, next) => {
  const skillId = await Skill.findOne({ name: req.body.skillName });
  if (!skillId) return next(new AppError('This is not a skill!', 400));

  const skills = req.user.additionalData.skills;
  for (let i = 0; i < skills.length; i++) {
    if (skills[i].skill === req.body.skillName) {
      skills.splice(i, 1);
      break;
    }
  }

  const applicantData = await ApplicantData.findByIdAndUpdate(
    { _id: req.user.additionalData._id },
    {
      skills
    },
    { new: true, runValidators: true }
  );
  res.status(202).json(applicantData);
});

exports.updateCategories = catchAsync(async (req, res, next) => {
  const categoryId = await Category.findOne({ name: req.body.categoryName });
  if (!categoryId) return next(new AppError('This is not a  category!', 400));
  const categories = req.user.additionalData.categories;
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].category === req.body.categoryName)
      return next(new AppError('category aleardy added!', 400));
  }
  const applicantData = await updateModelData(req.user.additionalData._id, {
    categories: {
      category: categoryId.name
    }
  });
  res.status(200).json(applicantData);
});

exports.deleteCategories = catchAsync(async (req, res, next) => {
  const categoryId = await Category.findOne({ name: req.body.categoryName });
  if (!categoryId) return next(new AppError('This is not a  category!', 400));

  const categories = req.user.additionalData.categories;
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].category === req.body.categoryName) {
      categories.splice(i, 1);
      break;
    }
  }

  const applicantData = await ApplicantData.findByIdAndUpdate(
    { _id: req.user.additionalData._id },
    {
      categories
    },
    { new: true, runValidators: true }
  );
  res.status(202).json(applicantData);
});

exports.updateLanguages = catchAsync(async (req, res, next) => {
  const languageId = await Language.findOne({ name: req.body.languageName });
  if (!languageId) return next(new AppError('This is not a language!', 400));
  const languages = req.user.additionalData.languages;
  for (let i = 0; i < languages.length; i++) {
    if (languages[i].language === req.body.languageName)
      return next(new AppError('language aleardy added!', 400));
  }
  const applicantData = await updateModelData(req.user.additionalData._id, {
    languages: {
      language: languageId.name,
      Reading: req.body.Reading,
      Writing: req.body.Writing,
      Listening: req.body.Listening,
      Speaking: req.body.Speaking
    }
  });

  res.status(200).json(applicantData);
});

exports.deleteLanguages = catchAsync(async (req, res, next) => {
  const languageId = await Language.findOne({ name: req.body.languageName });
  if (!languageId) return next(new AppError('This is not a language!', 400));
  const languages = req.user.additionalData.languages;
  for (let i = 0; i < languages.length; i++) {
    if (languages[i].language === req.body.languageName);
    {
      languages.splice(i, 1);
      break;
    }
  }

  const applicantData = await ApplicantData.findByIdAndUpdate(
    { _id: req.user.additionalData._id },
    {
      languages
    },
    { new: true, runValidators: true }
  );
  res.status(202).json(applicantData);
});

exports.updateSalary = catchAsync(async (req, res, next) => {
  const applicantData = await ApplicantData.findByIdAndUpdate(
    req.user.additionalData._id,
    {
      salary: req.body.salary
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(applicantData);
});
//todo
exports.updateOnlinePresence = catchAsync(async (req, res, next) => {
  const applicantData = await ApplicantData.findByIdAndUpdate(
    req.user.additionalData._id,
    {
      onlinePresence: {
        ..._.pick(req.body, [
          'linkedIn',
          'facebook',
          'twitter',
          'behance',
          'instagram',
          'gitHub',
          'stackOverflow',
          'youTube',
          'blog',
          'website',
          'other'
        ])
      }
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(applicantData);
});

exports.updateJobTitles = catchAsync(async (req, res, next) => {
  const jobTitleId = await JobTitle.findOne({ name: req.body.jobTitleName });
  if (!jobTitleId) return next(new AppError('This is not a job Title!', 400));
  const jobTitles = req.user.additionalData.jobTitles;
  for (let i = 0; i < jobTitles.length; i++) {
    if (jobTitles[i].jobTitle === req.body.jobTitleName)
      return next(new AppError('job Title aleardy added!', 400));
  }
  const applicantData = await updateModelData(req.user.additionalData._id, {
    jobTitles: {
      jobTitle: jobTitleId.name
    }
  });

  res.status(200).json(applicantData);
});
exports.deleteJobTitles = catchAsync(async (req, res, next) => {
  const jobTitleId = await JobTitle.findOne({ name: req.body.jobTitleName });
  if (!jobTitleId) return next(new AppError('This is not a job Title!', 400));
  const jobTitles = req.user.additionalData.jobTitles;
  for (let i = 0; i < jobTitles.length; i++) {
    if (jobTitles[i].jobTitle === req.body.jobTitleName) {
      jobTitles.splice(i, 1);
      break;
    }
  }
  const applicantData = await ApplicantData.findByIdAndUpdate(
    { _id: req.user.additionalData._id },
    {
      jobTitles
    },
    { new: true, runValidators: true }
  );
  res.status(202).json(applicantData);
});

async function updateModelData (id, object) {
  const applicantData = await ApplicantData.findByIdAndUpdate(
    { _id: id },
    {
      $push: object
    },
    { new: true, runValidators: true }
  );
  return applicantData;
}
exports.getSkills = factory.getAll(Skill);
exports.getCategories = factory.getAll(Category);
exports.getLanguages = factory.getAll(Language);
exports.getJobTitles = factory.getAll(JobTitle);


exports.searchSkills = catchAsync(async (req, res, next) => {
  const keyword = req.params.keyword;
  const { documents, totalCount } = await exports.getSearchQuery(
    'skills',
    {},
    keyword,
    req
  );
  res.status(200).json(helpers.getPaging(documents, req, totalCount));
});
exports.searchJobTitles = catchAsync(async (req, res, next) => {
  const keyword = req.params.keyword;
  const { documents, totalCount } = await exports.getSearchQuery(
    'jobTitles',
    {},
    keyword,
    req
  );
  res.status(200).json(helpers.getPaging(documents, req, totalCount));
});
exports.searchCategories = catchAsync(async (req, res, next) => {
  const keyword = req.params.keyword;
  const { documents, totalCount } = await exports.getSearchQuery(
    'Categories',
    {},
    keyword,
    req
  );
  res.status(200).json(helpers.getPaging(documents, req, totalCount));
});

exports.updatePicture = catchAsync(async (req, res, next) => {
  // check if file is missing
  if (!req.file || !req.file.buffer) {
    return next(new AppError('image file is missing', 400));
  }

  // save the image and get its name
  const newImageName = await helpers.prepareAndSaveImage(
    req.file.buffer,
    path.resolve(__dirname, '..') + '/assets/images/users'
  );

  // update image url in the database
  const url = `${req.protocol}://${req.get('host')}`;
  const image = `${url}/api/v1/static/images/users/${newImageName}`;
  await User.findByIdAndUpdate(req.user._id, {
    imageUrl: image
  });
  res.status(200).json({ image });
});

exports.updateCV = catchAsync(async (req, res, next) => {
  // check if file is missing
  if (!req.file) {
    return next(new AppError('cv file is missing', 400));
  }

  // update cv url in the database
  const url = `${req.protocol}://${req.get('host')}`;
  const cv = `${url}/api/v1/static/documents/cvs/${req.file.filename}`;
  const applicantData = await ApplicantData.findByIdAndUpdate(
    req.user.additionalData._id,
    {
      cvURL: cv,
      cvLastUpdated: Date.now()
    },
    {
      new: true
    }
  );
  res.status(200).json(applicantData);
});

exports.CVsMultipart = catchAsync(async (req, res, next) => {
  helpers.getMultiPart(false, path.resolve(__dirname, '..') + '/assets/cvs')(
    req,
    res,
    next
  );
});

exports.profilePictureMultipart = catchAsync(async (req, res, next) => {
  helpers.getMultiPart(
    true,
    path.resolve(__dirname, '..') + '/assets/images/users'
  )(req, res, next);
});

/**
 * function to get the search query for any model providing the keyword to be searched
 * @param {String} type - the model name of the collection to be searched
 * @param {Object} additionalConditions - any additional query conditions to be applied in the query
 * @param {String} keyword - the item name or part of its name
 * @param {Request} req - express request object
 * @param {Object} popOptions - object contains what fields to be populated in the returned document
 * @returns {documents, totalCount}
 */

exports.getSearchQuery = async function getSearchQuery (
  type,
  additionalConditions,
  keyword,
  req,
  popOptions
) {
  const offset = req.query.offset * 1 || 0;
  const limit = req.query.limit * 1 || 20;
  const Model = getModel[type];
  if (!Model) return null;
  const query = {
    name: { $regex: keyword, $options: 'i' },
    ...additionalConditions
  };
  let documents = Model.find(query)
    .limit(limit)
    .skip(offset);
  if (popOptions) documents = await documents.populate(popOptions);
  else documents = await documents;
  let totalCount = await Model.find(query).countDocuments();
  return { documents, totalCount };
};

const getModel = {
  skills: Skill,
  jobTitles: JobTitle,
  Categories: Category
};
