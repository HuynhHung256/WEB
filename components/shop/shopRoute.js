const express = require('express');
const router = express.Router();
const controller=require('./shopController');

/* GET home page. */
router.get('/', controller.showList);
router.get('/:page', controller.showList);
router.get('/product/:id',controller.showDetail);

module.exports = router;