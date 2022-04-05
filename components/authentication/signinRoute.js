const express = require('express');
const router = express.Router();
const controller=require('./authenticationController');
const passport=require('./passport');


/* GET home page. */
router.get('/', controller.showSignin);
router.post('/', passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/signin'
}));
module.exports = router;
