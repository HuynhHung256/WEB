const express = require('express');
const router = express.Router();
const controller=require('./authenticationController');

/* GET home page. */
router.get('/', controller.showSignup);

module.exports = router;