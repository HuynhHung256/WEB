const express = require('express');
const router = express.Router();
const controller=require('./authenticationController');

/* GET home page. */
router.get('/', controller.showSignup);
router.post('/', controller.signup);

module.exports = router;