const async = require('hbs/lib/async');
const { list, numOfPage, productById } = require('../../models/services/productService');


exports.home = (req, res, next) => {
    res.render('shop/index');
}

exports.detail = async (req, res, next) => {
    const id = req.params['id'];
    const product = await productById(id);
    res.render('shop/product-detail', {product:product});
}

exports.list = async (req, res, next) => {
    const page=req.params['page']||1;
    const products = await list(page);
    const nPage = await numOfPage();
    console.log(page);
    res.render('shop/shop', { products: products, page: nPage });
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
