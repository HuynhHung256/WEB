const express = require('express');
const router = express.Router();
const controller=require('../../controller/admin/adminController')

/* GET home page. */
router.get('/', controller.admin);
router.get('/:page', controller.admin);



module.exports = router;