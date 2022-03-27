exports.home = (req, res, next) => {
    res.render('shop/index');
}

exports.detail = (req, res, next) => {
    res.render('shop/product-detail');
}

exports.list = (req, res, next) => {
    res.render('shop/shop');
}

