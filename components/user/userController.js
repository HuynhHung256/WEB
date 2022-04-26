const { redirect } = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
// const { list, numOfPage, productById, send, update , delete }
const service = require('./userService');

exports.user = (req, res, next) => {
    if(!req.user){
        res.redirect('/signin');
        return;
    }
    res.render('user/user',{email:req.user.email,layout:'layout'});
}

exports.getProfile = async (req, res, next) => {
    if(!req.user){
        res.json(false);
        return;
    }
    const profile = await service.profile(req.user.id);
    res.json(profile);
}

exports.updateProfile = async (req, res, next) => {
    if(!req.user){
        res.redirect('/signin');
        return;
    }
    const profile = req.body;
    await service.updateProfile(req.user.id,profile);
    res.redirect('/user');
}