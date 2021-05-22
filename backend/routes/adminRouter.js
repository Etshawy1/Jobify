const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = express.Router();
router.use(authController.protect(true));
router.post('/addskill', adminController.addSkill);
router.post('/addlanguage', adminController.addLanguage);
router.post('/addjobtitle', adminController.addJobTitle);
module.exports = router;
