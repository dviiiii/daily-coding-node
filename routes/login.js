/**
 * Created by Administrator on 2017/10/24/024.
 */
const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');

router.post('/login', loginController.login);


module.exports = router;