const async = require('hbs/lib/async');
const service = require('../product/productService');

const NUM_PRODUCT_IN_PAGE=4;

exports.showDetail = async (req, res, next) => {
    const id = req.params['id'];
    const product = await service.productById(id);
    res.render('shop/product-detail', {id:id, product:product, layout:'layout'});
}

exports.showList = async (req, res, next) => {
    if(req.user && req.user.role=='admin'){
        res.redirect('/admin');
        return;
    }
    const page=req.params['page']||1;
    const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
    const nProduct = await service.numOfProduct();
    // console.log(page);
    res.render('shop/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE), layout:'layout'});
}

exports.getList = async (req, res, next) => {
    const page=req.params.page;
    const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
    const nProduct = await service.numOfProduct();
    // console.log(page);
    // res.render('shop/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE), layout:'layout'});
    res.json({ products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE)});
}

// exports.getNumOfPage = async (req, res, next) => {
//     const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
//     const nProduct = await service.numOfProduct();
//     res.json(Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE));
// }


exports.cart = (req, res, next) => {
    res.render('shop/cart', {layout:'layout'});
}

exports.checkout = (req, res, next) => {
    res.render('shop/checkout',{layout:'layout'});
}
