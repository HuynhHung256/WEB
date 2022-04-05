const express = require('express');
const router = express.Router();
const controller=require('./authenticationController');
// const passport=require('./passport');


/* GET home page. */
router.get('/', controller.signout);

module.exports = router;