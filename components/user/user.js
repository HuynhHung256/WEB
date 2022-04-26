const express = require('express');
const router = express.Router();
const controller=require('./userController');


/* GET home page. */
router.get('/', controller.user);
router.post('/', controller.updateProfile);
router.get('/api/get-profile', controller.getProfile);

module.exports = router;