
exports.user = (req, res, next) => {
    res.render('user/user');
}

exports.cart = (req, res, next) => {
    res.render('user/cart');
}

exports.checkout = (req, res, next) => {
    res.render('user/checkout');
}
