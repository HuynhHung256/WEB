const express = require('express');
const router = express.Router();
const controller=require('./adminController');

/* GET home page. */
router.get('/', controller.showCreateAdmin);
router.post('/',controller.createAdmin);


module.exports = router;