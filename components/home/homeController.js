const { redirect } = require('express/lib/response');
const async = require('hbs/lib/async');
const service = require('../product/productService');

const NUM_PRODUCT_IN_PAGE=4;


exports.showHome = async(req, res, next) => {
    if(req.user && req.user.role=='admin'){
        res.redirect('/admin');
        return;
    }
    const products = await service.list(1,9);
    res.render('home/index', { products: products, layout:'layout'});

    // if(req.user==undefined || req.user.role=='customer'){
    //     const products = await service.list(1,9);
    //     res.render('home/index', { products: products});
    // }
    // if(req.user && req.user.role=='admin'){
    //     const page=req.params['page']||1;
    //     const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
    //     const nProduct = await service.numOfProduct();
    //     res.render('admin/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE)});
    // }
}