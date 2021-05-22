const { User } = require('./../models/userModel');
const { ApplicantData } = require('./../models/applicantDataModel');
const _ = require('lodash');
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
