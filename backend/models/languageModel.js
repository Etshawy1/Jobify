const mongoose = require('mongoose');
const validator = require('validator');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    unique: true
  }
});

languageSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

const Language = mongoose.model(
  constants.MODELS_NAMES.language,
  languageSchema
);

exports.Language = Language;
