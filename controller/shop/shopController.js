exports.home = (req, res, next) => {
    res.render('shop/index');
}

exports.detail = (req, res, next) => {
    res.render('shop/product-detail');
}

exports.list = (req, res, next) => {
    res.render('shop/shop');
}

exports.signin = (req, res, next) => {
    res.render('shop/signin');
}

exports.cart = (req, res, next) => {
    res.render('shop/cart');
}

exports.checkout = (req, res, next) => {
    res.render('shop/checkout');
}
