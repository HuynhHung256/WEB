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
    const {email,pass}=req.body;
    const user=await service.isUserExist(email);
    if(user){
       return; 
    }
    
    await service.createAccount(email,pass);
    
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

exports.showRoleError= (req,res,next)=>{
    res.render('authentication/role-error')
}

