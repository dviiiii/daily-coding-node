/**
 * Created by zzx on 2017/11/13.
 */
const express = require('express');
const router = express.Router();
const testapiController = require('../controller/testapiController');

// router.post('/addApiType', testapiController.addApiType);
// router.get('/queryApiType', testapiController.queryApiType);
// router.post('/deleteApiType', testapiController.deleteApiType);
// router.post('/addApiItem', testapiController.addApiItem);
// // router.get('/queryReviewInfo', bookController.queryReviewInfo);
// router.post('/queryApiItem', testapiController.queryApiItem);
router.post('/queryCalendar_info.do', testapiController.queryCalendar_info);


module.exports = router;