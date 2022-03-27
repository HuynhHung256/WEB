
exports.signin = (req, res, next) => {
    res.render('user/signin');
}

exports.cart = (req, res, next) => {
    res.render('user/cart');
}

exports.checkout = (req, res, next) => {
    res.render('user/checkout');
}
