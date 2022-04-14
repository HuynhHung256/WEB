const express = require('express');
const router = express.Router();
const controller=require('./shopController');

/* GET home page. */
router.get('/', controller.showList);
// router.get('/:page', controller.showList);
router.get('/product/:id',controller.showDetail);
router.get('/api/paging/:page', controller.getList);
// router.get('/api/paging/num-of-page', controller.getNumOfPage);

module.exports = router;