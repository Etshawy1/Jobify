const express = require('express');
const authController = require('../controllers/authController');
const recruiterController = require('../controllers/recruiterController');
const constants = require('../utils/constants');

const router = express.Router();

// any endpoint written after the following line is protected
router.use(authController.protect(true));
router.use(authController.restrictTo(constants.USER_TYPES.RECRUITER));

router.put(
  '/updatepicture',
  recruiterController.profilePictureMultipart,
  recruiterController.updatePicture
);
router.patch('/updatedata', recruiterController.updateData);
router.patch('/jopstatus', recruiterController.jopStatus);

module.exports = router;
