const { redirect } = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
// const { list, numOfPage, productById, send, update , delete }
const service = require('../product/productService');

exports.user = (req, res, next) => {
    res.render('user/user',{layout:'layout'});
}

exports.showuserinfo = async(req, res, next) => {
    if(!req.user){
        res.redirect('/signin');
    }
    const user = await service.list(req.user.id);
    res.json({user:user});
}

exports.cart = (req, res, next) => {
    res.render('user/cart',{layout:'layout'});
}

exports.checkout = (req, res, next) => {
    res.render('user/checkout',{layout:'layout'});
}
