exports.home = (req, res, next) => {
    res.render('shop/index');
}


exports.list = (req, res, next) => {
    res.render('shop/shop');
}

