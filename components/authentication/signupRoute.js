const express = require('express');
const router = express.Router();
const controller=require('./authenticationController');

/* GET home page. */
router.get('/', controller.showSignup);
router.post('/', controller.signup);
router.get('/api/check-email-exist/:email',controller.checkEmailExist);
module.exports = router;