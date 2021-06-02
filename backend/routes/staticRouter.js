const express = require('express');

const router = express.Router();

router.use('/images/users', express.static('assets/images/users'));
router.use('/images/companies', express.static('assets/images/companies'));
router.use('/documents/cvs', express.static('assets/cvs'));

module.exports = router;
