const {list,numOfPage} = require('../../models/services/productService');

exports.admin = async (req, res, next) => {
    const page=req.params['page']||1;
    const products = await list(page);
    const nPage = await numOfPage();
    res.render('admin/admin', { products: products, page: nPage });
}

exports.insert = (req, res, next) => {
    res.render('admin/insert');
}




