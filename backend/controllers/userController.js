const { User } = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync').threeArg;

exports.setToken = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    registraionToken: req.body.token,
  });
  res.status(200).json({
    user,
  });
});
