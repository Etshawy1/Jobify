const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

const recruiterDataSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'recruiter data should belong to a user']
  },
  address: {
    type: String,
    minlength: 3,
    maxlength: 100
  },
  employeesCount: {
    type: String,
    enum: [
      '1-50 Employees',
      '51-100 Employees',
      '101-300 Employees',
      'more than 301 Employees'
    ]
  },
  field: {
    type: String,
    enum: [
      "Accounting/Finance",
      "Administration",
      "Banking",
      "R&D/Science",
      "Engineering - Construction/Civil/Architecture",
      "Business Development",
      "Creative/Design/Art",
      "Customer Service/Support",
      "Writing/Editorial",
      "Hospitality/Hotels/Food Services",
      "Human Resources",
      "Installation/Maintenance/Repair",
      "IT/Software Development",
      "Legal",
      "Logistics/Supply Chain",
      "Operations/Management",
      "Manufacturing/Production",
      "Marketing/PR/Advertising",
      "Medical/Healthcare",
      "Other",
      "Project/Program Management",
      "Quality",
      "Analyst/Research",
      "Sales/Retail",
      "Media/Journalism/Publishing",
      "Sports and Leisure",
      "Fashion",
      "Pharmaceutical",
      "Tourism/Travel",
      "Purchasing/Procurement",
      "Strategy/Consulting",
      "C-Level Executive/GM/Director",
      "Engineering - Telecom/Technology",
      "Engineering - Mechanical/Electrical",
      "Engineering - Oil & Gas/Energy",
      "Engineering - Other",
      "Education/Teaching",
      "Training/Instructor",
    ]
  },
  description: {
    type: String,
    maxlength: 1000,
    minlength: 5
  }
});

recruiterDataSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

const RecruiterData = mongoose.model(
  constants.MODELS_NAMES.recruiterData,
  recruiterDataSchema
);

exports.RecruiterData = RecruiterData;
