const { redirect } = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
// const { list, numOfPage, productById, send, update , delete }
const service = require('../product/productService');
const validator=require('../validation/userInput');

const NUM_PRODUCT_IN_PAGE=4;

function isAdmin(user){
    if(user&&user.role=='admin') return true;
    return false;
}

exports.showList = async (req, res, next) => {
    if(!isAdmin(req.user)){
        res.redirect('/role-error');
        return;
    }
    const page = req.params['page'] || 1;
    const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
    const nProduct = await service.numOfProduct();
    res.render('admin/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE), layout:'layout_admin'});
}
exports.showDetail = async (req, res, next) => {
    if(!isAdmin(req.user)){
        res.redirect('/role-error');
        return;
    }

    const id = req.params.id;
    const product = await service.productById(id);
    res.render('admin/product-detail', { product: product, layout:'layout_admin' });
}
exports.showCreateProduct = (req, res, next) => {
    if(!isAdmin(req.user)){
        res.redirect('/role-error');
        return;
    }

    res.render('admin/insert', {layout:'layout_admin'});
}

exports.createProduct = async (req, res, next) => {
    if(!isAdmin(req.user)){
        res.redirect('/role-error');
        return;
    }

    const obj = req.body;

    // console.log(typeof(req.file.buffer));
    const validProduct=validator.product(obj);
    if(validProduct.valid)
        res.render('admin/insert',{error:validProduct.errors, layout:'layout_admin'});
    else {
        await service.send(obj);
        res.redirect('/admin');
    }
}

exports.editProduct = async (req, res, next) => {
    if(!isAdmin(req.user)){
        res.redirect('/role-error');
        return;
    }

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
    if(!isAdmin(req.user)){
        res.redirect('/role-error');
        return;
    }

    res.render('admin/create-admin', {layout:'layout_admin'});
}
// exports.deleteProduct = async (req, res, next) => {
//     const id = req.params['id'];
//     await service.delete(id);
//     const products = await service.list(1);
//     const nPage = await service.numOfPage();
//     res.render('admin/admin', { products: products, page: nPage });
// }

exports.getList = async (req, res, next) => {
    const page=req.params.page;
    const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
    const nProduct = await service.numOfProduct();
    // console.log(page);
    // res.render('shop/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE), layout:'layout_admin'});
    res.json({ products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE)});
}
