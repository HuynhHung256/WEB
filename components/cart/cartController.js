const { ObjectId } = require('mongodb');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const service = require('./cartService');
const { redirect } = require('express/lib/response');

const PRODUCT_IN_PAGE = 12;

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
    const product_id = req.params.product_id;
    const qty = req.params.qty;

    if (req.user == null) {
        res.json({ success: false, message: "Please signup to continue" })
    }
    else {
        const checkinstock = await service.checkinstock(req.user.id, product_id, qty);
        if (!checkinstock) {
            res.json({ success: false, message: "Out of stock!" });
        }
        else {
            await service.add(req.user.id, product_id, qty);
            res.json({ success: true, message: "Added" });
        }
    }
}

exports.cart = (req, res, next) => {
    // const cart= await service.getCart(req.user.id);
    res.render('user/cart', { layout: 'layout' });
}

exports.getList = async (req, res, next) => {
    const cart= await service.getCart(req.user.id);
    res.json(cart);
}

