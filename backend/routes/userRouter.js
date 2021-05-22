const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

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

// any endpoint written after the following line is protected
router.use(authController.protect(true));

router.patch('/updatepassword', authController.updatePassword);
router.patch('/updateapplicantdata', userController.updateData);
router.patch('/updateskills', userController.updateSkills);
router.patch('/updatelanguage', userController.updateLanguages);
router.get('/getskills', userController.getSkills);
router.get('/searchskills/:keyword', userController.searchSkills);

module.exports = router;
