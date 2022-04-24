const express = require('express');
const router = express.Router();
const controller=require('./adminController');

/* GET home page. */
router.get('/', controller.showList);
// router.get('/:page', controller.showList);
router.get('/:id', controller.showDetail);
router.post('/:id', controller.editProduct);
router.get('/api/paging/:page', controller.getList);

module.exports = router;