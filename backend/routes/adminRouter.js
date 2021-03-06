const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const constants = require('../utils/constants');
const router = express.Router();
router.use(authController.protect(true));
router.use(authController.restrictTo(constants.USER_TYPES.ADMIN));

router.get('/recruiters', adminController.getAppliedRecruiters);
router.patch('/recruiter/:id', adminController.acceptRecruiter);
router.delete('/recruiter/:id', adminController.rejectRecruiter);

router.post('/skill', adminController.addSkill);
router.delete('/skill/:id', adminController.deleteSkill);
router.patch('/skill/:id', adminController.updateSkill);

router.post('/language', adminController.addLanguage);
router.delete('/language/:id', adminController.deleteLanguage);
router.patch('/language/:id', adminController.updateLanguage);

router.post('/jobtitle', adminController.addJobTitle);
router.delete('/jobtitle/:id', adminController.deleteJobTitle);
router.patch('/jobtitle/:id', adminController.updateJobTitle);

router.post('/category', adminController.addCategory);
router.delete('/category/:id', adminController.deleteCategory);
router.patch('/category/:id', adminController.updateCategory);

router.get('/appliedjobscount', adminController.getCountJobs);
router.get('/inconsiderationcount', adminController.getApplicantsCount);
router.get('/notselectedcount', adminController.getRejectedApplicantsCount);
router.get('/viewedcount', adminController.getViewedApplicantsCount);
module.exports = router;
