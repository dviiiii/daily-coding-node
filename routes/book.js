/**
 * Created by zzx on 2017/11/13.
 */
const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');

router.post('/addBook', bookController.addBook);
router.get('/queryBookList', bookController.queryBookList);
router.post('/addReading', bookController.addReading);
router.get('/queryReviewInfo', bookController.queryReviewInfo);
router.post('/checkReview', bookController.checkReview);
router.post('/deleteBook', bookController.deleteBook);

module.exports = router;