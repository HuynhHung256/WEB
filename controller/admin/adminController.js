const {list,numOfPage,productById} = require('../../models/services/productService');

exports.admin = async (req, res, next) => {
    const page=req.params['page']||1;
    const products = await list(page);
    const nPage = await numOfPage();
    res.render('admin/admin', { products: products, page: nPage });
}
exports.detail = async (req, res, next) => {
    const id = req.params['id'];
    const product = await productById(id);
    res.render('admin/admin-view', {product:product});
}
exports.insert = (req, res, next) => {
    res.render('admin/insert');
}

exports.sendToServer=(req,res,next)=>{
    console.log(req);
}


