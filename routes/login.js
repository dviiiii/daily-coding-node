/**
 * Created by Administrator on 2017/10/24/024.
 */
const express = require('express');
const router = express.Router();
const login = require('../controller/login');

router.post('/login', login.login);


module.exports = router;