const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const constants = require('../utils/constants');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post(
  '/auth/google/jobify',
  passport.authenticate('googleToken', {
    session: false,
    scope: ['profile', 'email']
  }),
  authController.googleOauth
);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.get('/profile/:id', userController.getUserProfile);
router.get('/getskills', userController.getSkills);

// any endpoint written after the following line is protected
router.use(authController.protect(true));
router.use(authController.restrictTo(constants.USER_TYPES.APPLICANT));

router.put(
  '/updatepicture',
  userController.profilePictureMultipart,
  userController.updatePicture
);
router.put('/updatecv', userController.CVsMultipart, userController.updateCV);
router.patch('/updatepassword', authController.updatePassword);
router.patch('/updateapplicantdata', userController.updateData);
router.patch('/updateskills', userController.updateSkills);
router.patch('/updatelanguage', userController.updateLanguages);
router.patch('/updatejobtitle', userController.updateJobTitles);
router.patch('/updatecategory', userController.updateCategories);
router.patch('/updatesalary', userController.updateSalary);
router.delete('/deleteskills', userController.deleteSkills);
router.delete('/deletecategory', userController.deleteCategories);
router.delete('/deletejobtitle', userController.deleteJobTitles);
router.delete('/deletelanguage', userController.deleteLanguages);
router.patch('/updateOnlinePresence', userController.updateOnlinePresence);
router.get('/searchskills/:keyword', userController.searchSkills);
router.get('/searchjobtitles/:keyword', userController.searchJobTitles);
router.get('/searchcategories/:keyword', userController.searchCategories);

module.exports = router;
