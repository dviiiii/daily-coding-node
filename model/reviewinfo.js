/**
 * Created by zzx on 2017/11/14.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewinfoModel = mongoose.model('reviewinfo', {
    bookName: String,    //书名
    bookPageNumberS: String,   //开始页
    bookPageNumberE: String, //结束页
    reviewDate: Array //复习时间
});

module.exports = reviewinfoModel;