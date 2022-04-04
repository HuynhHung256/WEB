const express = require('express');
const router = express.Router();
const controller=require('./adminController');

/* GET home page. */
router.get('/', controller.showCreateProduct);
router.post('/',controller.createProduct);


module.exports = router;