const { User } = require('./../models/userModel');
const { Skill } = require('./../models/skillModel');
const { Language } = require('./../models/languageModel');
const { ApplicantData } = require('./../models/applicantDataModel');
const _ = require('lodash');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const catchAsync = require('./../utils/catchAsync').threeArg;

exports.setToken = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    registraionToken: req.body.token
  });
  res.status(200).json({
    user
  });
});

exports.updateData = catchAsync(async (req, res, next) => {
  const applicantData = await ApplicantData.findByIdAndUpdate(
    { _id: req.user.additionalData },
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
  const applicantData = await ApplicantData.findByIdAndUpdate(
    { _id: req.user.additionalData },
    {
      $push: {
        skills: {
          skill: skillId.name,
          yearsExperiance: req.body.yearOfExperiance
        }
      }
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(applicantData);
});

exports.updateLanguages = catchAsync(async (req, res, next) => {
  const languageId = await Language.findOne({ name: req.body.languageName });
  if (!languageId) return next(new AppError('This is not a language!', 400));
  const applicantData = await ApplicantData.findByIdAndUpdate(
    { _id: req.user.additionalData },
    {
      $push: {
        languages: {
          language: languageId.name,
          Reading: req.body.Reading,
          Writing: req.body.Writing,
          Listening: req.body.Listening,
          Speaking: req.body.Speaking
        }
      }
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(applicantData);
});

exports.getSkills = factory.getAll(Skill);

exports.searchSkills = catchAsync(async (req, res, next) => {
  const offset = 0;
  const limit = req.query.limit * 1 || 16;
  const keyword = req.params.keyword;
  const skills = await exports.getSearchQuery(
    'skills',
    {},
    keyword,
    limit,
    offset
  );
  res.status(200).json(skills);
});

/**
 * function to get the search query for any model providing the keyword to be searched
 * @param {String} type - the model name of the collection to be searched
 * @param {Object} additionalConditions - any additional query conditions to be applied in the query
 * @param {String} keyword - the item name or part of its name
 * @param {Number} limit - maximum number of documents returned from the query
 * @param {Number} offset - index of first element in the response
 * @param {Object} popOptions - object contains what fields to be populated in the returned document
 * @returns {Query}
 */

exports.getSearchQuery = async function getSearchQuery (
  type,
  additionalConditions,
  keyword,
  limit,
  offset,
  popOptions
) {
  const Model = getModel[type];
  if (!Model) return null;
  let query = Model.find({
    name: { $regex: keyword, $options: 'i' },
    ...additionalConditions
  })
    .limit(limit)
    .skip(offset);
  if (popOptions) query = query.populate(popOptions);
  return query;
};

const getModel = {
  skills: Skill
};

// if (newUser.type === constants.USER_TYPES.APPLICANT) {
//   const newApplicant = await ApplicantData.create({
//     ..._.pick(req.body, ['firstName', 'lastName']),
//     user: newUser._id
//   });
//   newUser = await User.findByIdAndUpdate(
//     {
//       _id: newUser._id
//     },
//     {
//       additionalData: newApplicant._id,
//       onModel: 'ApplicantData'
//     },
//     { new: true }
//   ).populate({
//     path: 'additionalData'
//   });
// }
// await new Email(newUser, url).sendWelcome();
