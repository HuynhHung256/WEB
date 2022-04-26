const express = require('express');
const router = express.Router();
const controller=require('./cartController');

/* GET home page. */
router.get('/', controller.checkout);

module.exports = router;