/**
 * Created by zzx on 2017/11/13.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
const bookModel = mongoose.model('book', {
    bookName 	: String,    //书名
    bookPageNumber 	: String,    //页码
    progress: String //进度
});
//
module.exports = bookModel;