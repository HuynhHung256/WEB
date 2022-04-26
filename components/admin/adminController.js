const { redirect } = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
// const { list, numOfPage, productById, send, update , delete }
const service = require('../product/productService');
const validator=require('../validation/userInput');
const {createAccount,isUserExist}= require('../authentication/authenticationService');


const PRODUCT_IN_PAGE = 12;

function isAdmin(user){
    if(user&&user.role=='admin') return true;
    return false;
}

exports.showList = async (req, res, next) => {
    if(!isAdmin(req.user)){
        res.redirect('/role-error');
        return;
    }

    res.render('admin/index', { search:req.query.search, layout:'layout_admin'});
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
    const product= await service.parse(req);
    // console.log(product.files);
    // const obj = req.body;

    // console.log(typeof(req.file.buffer));
    const validProduct=validator.product(product.fields);
    if(validProduct.valid)
        res.render('admin/insert',{error:validProduct.errors, layout:'layout_admin'});
    else {
        
        // await service.send(obj);
        await service.insert(product);

        res.redirect('/admin');
    }

}

exports.editProduct = async (req, res, next) => {
    if(!isAdmin(req.user)){
        res.redirect('/role-error');
        return;
    }

    const id = req.params.id;
    const product = await service.parse(req);
    // console.log(product.files);
    if (product.fields.delete) {
        await service.delete(id);
        res.redirect('/admin');
    }
    else {
        await service.update(id, product);
        res.redirect('/admin/'+id);
    }
}

exports.showCreateAdmin=(req,res,next)=>{
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
    const page = {
        number: req.params['page'] || 1,
        limit: PRODUCT_IN_PAGE
    };
    const query = {
        name: {$regex:req.query.search||'', $options: 'i'}
    }
    const sort={
        name:1
    }
    const products = await service.list(query,sort,page);
    const nProduct = await service.numOfProduct(query);
    // console.log(page);
    // res.render('shop/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE), layout:'layout_admin'});
    res.json({ products: products, nProduct:nProduct, page: page.number , nPage: Math.ceil(nProduct/page.limit)});
}

exports.createAdmin= async (req, res, next) => {
    const {email,password}=req.body;
    console.log('user: ',email);
    console.log('pass: ',password);
    const user=await isUserExist(email);
    if(user){
       res.render('admin/create-admin',{error:'Email already exists',layout:'layout'});
       return;
    }
    
    await createAccount(email,password,'admin');
    
    res.redirect('admin');
}