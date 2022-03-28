const {list} = require('../../models/services/productService')
exports.home = (req, res, next) => {
    res.render('shop/index');
}

exports.detail = (req, res, next) => {
    res.render('shop/product-detail');
}

exports.list = async (req, res, next) => {
    const products = await list ();
    res.render('shop/shop',products);
}

exports.signin = (req, res, next) => {
    res.render('shop/signin');
}

exports.cart = (req, res, next) => {
    res.render('shop/cart');
}

exports.checkout = (req, res, next) => {
    res.render('shop/checkout');
}
