const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
// const { list, numOfPage, productById, send, update , delete }
const service = require('../product/productService');

const NUM_PRODUCT_IN_PAGE=4;



exports.list = async (req, res, next) => {
    const page = req.params['page'] || 1;
    const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
    const nProduct = await service.numOfProduct();
    res.render('admin/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE)});
}
exports.detail = async (req, res, next) => {
    const id = req.params['id'];
    const product = await service.productById(id);
    res.render('admin/product-detail', { product: product });
}
exports.insert = (req, res, next) => {
    res.render('admin/insert');
}

exports.sendToServer = async (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    await service.send(obj);
    res.redirect('/admin');
}

exports.updateProduct = async (req, res, next) => {
    const id = req.params['id'];
    const obj = JSON.parse(JSON.stringify(req.body));
    if (obj.delete) {
        await service.delete(id);
        res.redirect('/admin');
    }
    else {
        await service.update(id, obj);
        res.redirect('/admin/product/'+id);
    }
}

exports.createAdmin=(req,res,next)=>{
    res.render('admin/create-admin');
}
// exports.deleteProduct = async (req, res, next) => {
//     const id = req.params['id'];
//     await service.delete(id);
//     const products = await service.list(1);
//     const nPage = await service.numOfPage();
//     res.render('admin/admin', { products: products, page: nPage });
// }
