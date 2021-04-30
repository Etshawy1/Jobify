const express = require('express');

const router = express.Router();

router.use('/users', express.static('assets/images/users'));
router.use('/playlists', express.static('assets/images/playlists'));
router.use('/albums', express.static('assets/images/albums'));

module.exports = router;
