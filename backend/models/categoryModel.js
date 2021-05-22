const mongoose = require('mongoose');
const validator = require('validator');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    unique: true
  }
});

categorySchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

const Category = mongoose.model(
  constants.MODELS_NAMES.category,
  categorySchema
);

exports.Category = Category;
