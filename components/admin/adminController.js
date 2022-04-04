const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
// const { list, numOfPage, productById, send, update , delete }
const service = require('../product/productService');
const validator=require('../validation/userInput');

const NUM_PRODUCT_IN_PAGE=4;



exports.showList = async (req, res, next) => {
    const page = req.params['page'] || 1;
    const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
    const nProduct = await service.numOfProduct();
    res.render('admin/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE)});
}
exports.showDetail = async (req, res, next) => {
    const id = req.params['id'];
    const product = await service.productById(id);
    res.render('admin/product-detail', { product: product });
}
exports.showCreateProduct = (req, res, next) => {
    res.render('admin/insert');
}

exports.createProduct = async (req, res, next) => {
    const obj = req.body;
    // console.log(typeof(req.file.buffer));
    // if(!validator.product(obj,{})){
    //     console.log(validator.errors);
    // }
    // else 
    await service.send(obj);
    res.redirect('/admin');
}

exports.editProduct = async (req, res, next) => {
    const id = req.params['id'];
    const obj = req.body;
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
