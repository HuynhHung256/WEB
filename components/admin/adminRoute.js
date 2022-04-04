const express = require('express');
const router = express.Router();
const controller=require('./adminController');

/* GET home page. */
router.get('/', controller.list);
router.get('/:page', controller.list);
router.get('/product/:id', controller.detail);
router.post('/product/:id', controller.updateProduct);

module.exports = router;