const { ObjectId } = require('mongodb');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const service = require('./cartService');
const { redirect } = require('express/lib/response');

const PRODUCT_IN_PAGE = 12;

exports.checkout = (req, res, next) => {
    res.render('user/checkout', {layout:'layout'});
}

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

exports.cart = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/signin');
        return;
    }
    // const cart= await service.getCart(req.user.id);
    res.render('user/cart', { layout: 'layout' });
}

exports.getList = async (req, res, next) => {
    if (!req.user) {
        res.json(false);
        return;
    }
    const cart = await service.getCart(req.user.id);
    res.json(cart);
}

exports.plusQty = async (req, res, next) => {
    const product_id = req.params.id;
    const checkinstock = await service.checkinstock(req.user.id, product_id, 1);
    var quantity = await service.showCartQuantity(req.user.id,product_id);
    if (!checkinstock) {
        res.json({qty:quantity, success: false, message: "Out of stock!" });
    }

    else {
        await service.add(req.user.id, product_id, 1);
        quantity = await service.showCartQuantity(req.user.id,product_id);
        res.json({qty:quantity, success: true, message: "Added" });
    }
}
exports.minusQty = async (req, res, next) => {
    const product_id = req.params.id;
    const checkinstock = await service.checkinstock(req.user.id, product_id, 1);
    const success = await service.delete(req.user.id, product_id, 1);
    var quantity = await service.showCartQuantity(req.user.id,product_id);
    if (success == false) {
        res.json({qty:quantity, success: false, message: "Can't delete" });
    }  
    quantity = await service.showCartQuantity(req.user.id,product_id);
    res.json({qty:quantity, success: true, message: "Deleted" });
}
