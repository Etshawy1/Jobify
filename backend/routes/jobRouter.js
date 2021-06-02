const express = require('express');
const authController = require('../controllers/authController');
const jobController = require('../controllers/jobController');
const constants = require('../utils/constants');

const router = express.Router();

router.get('/', jobController.getAllJobs);

// any endpoint written after the following line is protected
router.use(authController.protect(true));

router.get('/:id', jobController.getJob);
router.post('/', authController.restrictTo(constants.USER_TYPES.RECRUITER), jobController.createJob);
router.put('/:id', authController.restrictTo(constants.USER_TYPES.RECRUITER), jobController.updateJob);
router.delete('/:id', authController.restrictTo(constants.USER_TYPES.RECRUITER), jobController.deleteJob);
router.get('/recruiter/:id', jobController.getRecruiterJobs);

module.exports = router;
