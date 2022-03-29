const express = require('express');
const router = express.Router();
const controller=require('../../controller/admin/adminController')

/* GET home page. */
router.get('/:id', controller.detail);
router.post('/:id', controller.updateProduct);
// router.get('/delete',controller.deleteProduct);


module.exports = router;