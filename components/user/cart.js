const express = require('express');
const router = express.Router();
const controller=require('./userController')

/* GET home page. */
router.get('/', controller.cart);

module.exports = router;