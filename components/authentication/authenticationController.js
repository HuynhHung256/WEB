const async = require('hbs/lib/async');
const service = require('./authenticationService');
// const passport=require('./passport');

exports.showSignin = (req, res, next) => {
    if(req.user)
        res.redirect('/');
    else
        res.render('authentication/signin');
}

exports.showSignup = (req, res, next) => {
    res.render('authentication/signup');
}

exports.signup= async(req,res,next)=>{
    await service.createAccount(req.body.email,req.body.password);
    
    res.redirect('/');
}
// exports.signin= (req,res,next)=>{
//     passport.authenticate('local',{
//         successRedirect:'/',
//         failureRedirect:'/signin'
//     });
// }

exports.signout= (req,res,next)=>{
    req.logout();
    res.redirect('/');
}
