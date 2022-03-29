const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
// const { list, numOfPage, productById, send, update , delete }
const service = require('../../models/services/productService');

exports.admin = async (req, res, next) => {
    const page = req.params['page'] || 1;
    const products = await service.list(page);
    const nPage = await service.numOfPage();
    res.render('admin/admin', { products: products, page: nPage });
}
exports.detail = async (req, res, next) => {
    const id = req.params['id'];
    const product = await service.productById(id);
    res.render('admin/admin-view', { product: product });
}
exports.insert = (req, res, next) => {
    res.render('admin/insert');
}

exports.sendToServer = async (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    await service.send(obj);
    const products = await service.list(1);
    const nPage = await service.numOfPage();
    res.render('admin/admin', { products: products, page: nPage });
}

exports.updateProduct = async (req, res, next) => {
    const id = req.params['id'];
    const obj = JSON.parse(JSON.stringify(req.body));
    if (obj.delete) {
        await service.delete(id);
        const products = await service.list(1);
        const nPage = await service.numOfPage();
        res.render('admin/admin', { products: products, page: nPage });
    }
    else {
        await service.update(id, obj);
        const product = await service.productById(id);
        res.render('admin/admin-view', { product: product });
    }
}

// exports.deleteProduct = async (req, res, next) => {
//     const id = req.params['id'];
//     await service.delete(id);
//     const products = await service.list(1);
//     const nPage = await service.numOfPage();
//     res.render('admin/admin', { products: products, page: nPage });
// }
