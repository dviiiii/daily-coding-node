/**
 * Created by Administrator on 2017/10/24/024.
 */
const express = require('express');
const router = express.Router();
const test = require('../controller/test/test');

router.post('/test', test.test);


module.exports = router;