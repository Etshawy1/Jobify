const mongoose = require('mongoose');
const validator = require('validator');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    unique: true
  }
});

skillSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

const Skill = mongoose.model(constants.MODELS_NAMES.skill, skillSchema);

exports.Skill = Skill;
