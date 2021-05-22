const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');
const _ = require('lodash');
const { Skill } = require('../models/skillModel');
const { Language } = require('../models/languageModel');
const { JobTitle } = require('../models/jobTitlesModel');
const { Category } = require('../models/categoryModel');

exports.addSkill = factory.createOne(Skill);
exports.addLanguage = factory.createOne(Language);
exports.addJobTitle = factory.createOne(JobTitle);
exports.addCategory = factory.createOne(Category);
