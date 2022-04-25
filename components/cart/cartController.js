const { ObjectId } = require('mongodb');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const service = require('./cartService');
const { redirect } = require('express/lib/response');


exports.editprodcart = async (req, res, next) => {
    const id = req.params['id'];
    const obj = req.body;
    if (obj.delete) {
        await service.delete(id);
        res.redirect('/admin');
    }
    else {
        await service.add(id, obj);
        res.redirect('/admin/product/' + id);
    }
}
exports.addtocart = async (req, res, next) => {
    const userid = req.user.id;
    const product_id = req.params.product_id;
    const qty = req.params.qty;

    if (!userid) {
        res.json({ success: false, message: "Please signup to continue" })
    }
    const checkinstock = await service.checkinstock(userid, product_id, qty);

    if (!checkinstock) {
        res.json({ success: false, message: "Out of stock!" });
    }
    else {
        await service.add(userid, product_id, qty);
        res.json({ success: true, message: "Added" });
    }

}

exports.cart = (req, res, next) => {
    res.render('user/cart', { layout: 'layout' });
}

