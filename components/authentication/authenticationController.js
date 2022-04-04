const async = require('hbs/lib/async');
const service = require('../product/productService');


exports.index = async(req, res, next) => {
    res.render('authentication/signin');
}