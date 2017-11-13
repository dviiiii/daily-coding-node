/**
 * Created by zzx on 2017/11/13.
 */
const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');

router.post('/addBook', bookController.addBook);


module.exports = router;