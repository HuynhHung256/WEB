const async = require('hbs/lib/async');
const service = require('./authenticationService');
// const passport=require('./passport');

exports.showSignin = (req, res, next) => {
    if(req.user)
        res.redirect('/');
    else
        res.render('authentication/signin',{layout:'layout'});
}

exports.showSignup = (req, res, next) => {
    res.render('authentication/signup',{layout:'layout'});
}

exports.signup= async(req,res,next)=>{
    const {email,password}=req.body;
    // console.log(password);
    const user=await service.isUserExist(email);
    if(user){
       res.render('authentication/signup',{error:'Email already exists',layout:'layout'});
       return;
    }
    
    await service.createAccount(email,password);
    
    res.redirect(307,'/authentication/signin');
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
    res.render('authentication/role-error',{layout:'layout'})
}

exports.checkEmailExist= async(req,res,next)=>{
    const email = req.params.email;
    const user=await service.isUserExist(email);
    res.json(!!user);
}