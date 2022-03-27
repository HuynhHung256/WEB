const express = require('express');
const router = express.Router();
const controller=require('../../controller/shop/shopController')

/* GET home page. */
router.get('/', controller.list);

module.exports = router;