const express = require('express');
const router = express.Router();
// const puppeteer = require('../controller/testApi/puppeteer');
const uploadImg = require('../controller/testApi/uploadImg');

// router.post('/puppeteer', puppeteer);
// router.get('/queryBookList', bookController.queryBookList);
router.post('/uploadImg', uploadImg.saveImg);
router.post('/upfile', uploadImg.saveFile);
module.exports = router;


