const async = require('hbs/lib/async');
const service = require('../product/productService');


exports.showSignin = async(req, res, next) => {
    res.render('authentication/signin');
}
exports.showSignup = async(req, res, next) => {
    res.render('authentication/signup');
}