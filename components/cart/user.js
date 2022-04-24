const express = require('express');
const router = express.Router();
const controller=require('./userController')

/* GET home page. */
router.get('/', controller.user);

module.exports = router;