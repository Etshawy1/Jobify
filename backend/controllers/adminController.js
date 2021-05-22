const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');
const _ = require('lodash');
const { Skill } = require('../models/skillModel');
const { Language } = require('../models/languageModel');
const { JobTitles } = require('../models/jobTitlesModel');

exports.addSkill = factory.createOne(Skill);
exports.addLanguage = factory.createOne(Language);
exports.addJobTitle = factory.createOne(JobTitles);
