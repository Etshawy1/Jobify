const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');
const _ = require('lodash');
const { Skill } = require('../models/skillModel');

exports.addSkill = factory.createOne(Skill);
