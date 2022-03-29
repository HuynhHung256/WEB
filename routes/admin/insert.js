const express = require('express');
const router = express.Router();
const controller=require('../../controller/admin/adminController')

/* GET home page. */
router.get('/', controller.insert);
router.post('/',controller.sendToServer);


module.exports = router;