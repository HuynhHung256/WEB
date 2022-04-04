const express = require('express');
const router = express.Router();
const controller=require('./homeController');

/* GET home page. */
router.get('/', controller.showHome);

module.exports = router;
