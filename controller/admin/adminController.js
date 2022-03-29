const async = require('hbs/lib/async');
const { list, numOfPage, productById, send } = require('../../models/services/productService');

exports.admin = async (req, res, next) => {
    const page = req.params['page'] || 1;
    const products = await list(page);
    const nPage = await numOfPage();
    res.render('admin/admin', { products: products, page: nPage });
}
exports.detail = async (req, res, next) => {
    const id = req.params['id'];
    const product = await productById(id);
    res.render('admin/admin-view', { product: product });
}
exports.insert = (req, res, next) => {
    res.render('admin/insert');
}

exports.sendToServer = async (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body))
    await send(obj);
    res.render('admin/insert');
}


