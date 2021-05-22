const mongoose = require('mongoose');
const validator = require('validator');
const mongoose_delete = require('mongoose-delete');
const constants = require('../utils/constants');

const applicantDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 30
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 30
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'applicant data should belong to a user']
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  dateOfBirth: {
    type: Date,
    min: '1-1-1900',
    max: '1-1-2000'
  },
  careerLevel: {
    type: String,
    enum: [
      'Student',
      'Entry Level',
      'Experienced',
      'Manager',
      'Senior Management'
    ]
  },
  currentJob: {
    type: String,
    enum: [
      'I am unemployed and desperate for a job',
      'I am actively looking for new opportunities and jobs',
      "I am happy where I am but don't mind finding good opportunities",
      'I am only interested in very specific opportunities',
      'I am not looking for a job'
    ]
  },
  jobType: [
    {
      type: String,
      enum: [
        'Internship',
        'Part Time',
        'Freelance/Project',
        'Full Time',
        'Work From Home'
      ]
    }
  ],
  skills: [
    {
      skill: {
        type: String,
        minlength: 3,
        maxlength: 30,
        unique: true
      },
      yearsExperiance: {
        type: String,
        enum: ['Less than 1 year', '1-3 years', '3-5 years', '5-7 years']
      }
    }
  ],
  jobTitles: [
    {
      jobTitle: {
        type: String,
        minlength: 3,
        maxlength: 30,
        unique: true
      }
    }
  ],
  categories: [
    {
      category: {
        type: String,
        minlength: 3,
        maxlength: 30,
        unique: true
      }
    }
  ],
  languages: [
    {
      language: {
        type: String,
        minlength: 3,
        maxlength: 30,
        unique: true
      },
      Reading: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
      },
      Writing: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
      },
      Listening: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
      },
      Speaking: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
      }
    }
  ],
  phone: String,
  salary: {
    type: Number,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function () {
        return 0 <= this.salary;
      },
      message: 'Salary must be postive number!'
    }
  }
});

applicantDataSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

const ApplicantData = mongoose.model(
  constants.MODELS_NAMES.applicantData,
  applicantDataSchema
);

exports.ApplicantData = ApplicantData;
