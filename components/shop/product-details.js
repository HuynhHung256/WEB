const express = require('express');
const router = express.Router();
const controller=require('./shopController')

/* GET home page. */
router.get('/:id', controller.detail);

module.exports = router;