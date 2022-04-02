const express = require('express');
const router = express.Router();
const controller=require('./shopController');

/* GET home page. */
router.get('/', controller.list);
router.get('/:page', controller.list);
router.get('/product/:id',controller.detail);

module.exports = router;