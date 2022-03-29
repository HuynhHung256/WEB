const express = require('express');
const router = express.Router();
const controller=require('../../controller/shop/shopController')

/* GET home page. */
router.get('/:id', controller.detail);

module.exports = router;