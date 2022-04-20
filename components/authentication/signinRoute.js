const express = require('express');
const router = express.Router();
const controller=require('./authenticationController');
const passport=require('./passport');


/* GET home page. */
router.get('/', controller.showSignin);
router.get('/wrong-account-info', controller.showSigninError);

router.post('/', passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/signin/wrong-account-info',
}));
module.exports = router;
