const {list} = require('../../models/services/shopService');

exports.admin = async (req, res, next) => {
    const products = await list();
    res.render('admin/admin',{products: products});
}

exports.insert = (req, res, next) => {
    res.render('admin/insert');
}




