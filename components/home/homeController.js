const async = require('hbs/lib/async');
const service = require('../product/productService');


exports.showHome = async(req, res, next) => {
    const page=req.params['page']||1;
    const products = await service.list(page,9);
    const nProduct = await service.numOfProduct();
    console.log(page);
    res.render('home/index', { products: products});
}