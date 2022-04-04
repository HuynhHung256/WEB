const async = require('hbs/lib/async');
const service = require('../product/productService');

const NUM_PRODUCT_IN_PAGE=4;

exports.detail = async (req, res, next) => {
    const id = req.params['id'];
    const product = await service.productById(id);
    res.render('shop/product-detail', {product:product});
}

exports.list = async (req, res, next) => {
    const page=req.params['page']||1;
    const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
    const nProduct = await service.numOfProduct();
    console.log(page);
    res.render('shop/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE)});
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
