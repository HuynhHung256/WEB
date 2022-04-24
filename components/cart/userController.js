
exports.user = (req, res, next) => {
    res.render('user/user',{layout:'layout'});
}

exports.cart = (req, res, next) => {
    res.render('user/cart',{layout:'layout'});
}

exports.checkout = (req, res, next) => {
    res.render('user/checkout',{layout:'layout'});
}
