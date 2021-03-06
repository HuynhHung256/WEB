const express = require('express');
const router = express.Router();
const controller=require('./cartController')

/* GET home page. */
router.get('/',controller.cart);
router.get('/api/addtocart/:product_id/:qty', controller.addtocart);
router.get('/api/get-cart', controller.getList);
router.get('/api/minus-qty/:id/:qty', controller.minusQty);
router.get('/api/plus-qty/:id/:qty', controller.plusQty);
router.get('/api/prodprice/:id',controller.prodprice)

module.exports = router;