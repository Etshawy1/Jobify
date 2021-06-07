const express = require('express');
const authController = require('../controllers/authController');
const jobApplicationController = require('../controllers/jobApplicationController');
const constants = require('../utils/constants');

const router = express.Router();

// any endpoint written after the following line is protected
router.use(authController.protect(true));

// create and modify user job application
router.post('/', jobApplicationController.makeUserJobApplications);

router.use(authController.restrictTo(constants.USER_TYPES.RECRUITER));
// gets all the application done on some job
router.get('/', jobApplicationController.getAllJobApplications);
router.patch('/:id', jobApplicationController.updateUserJobApplication);

module.exports = router;
