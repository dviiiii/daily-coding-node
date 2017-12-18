/**
 * Created by zzx on 2017/11/13.
 */
const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');

router.post('/addApiType', apiController.addApiType);
router.get('/queryApiType', apiController.queryApiType);
router.post('/deleteApiType', apiController.deleteApiType);
router.post('/addApiItem', apiController.addApiItem);
// router.get('/queryReviewInfo', bookController.queryReviewInfo);
router.post('/queryApiItem', apiController.queryApiItem);


module.exports = router;