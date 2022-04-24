const express = require('express');
const router = express.Router();
const controller=require('./cartController')

/* GET home page. */
router.get('/',controller.cart);
router.get('/api/addtocart/:product_id/:qty', controller.addtocart);
module.exports = router;