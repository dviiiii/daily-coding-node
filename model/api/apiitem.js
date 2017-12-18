/**
 * Created by zzx on 2017/12/7.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
const apiItemModel = mongoose.model('apiitem', {
    apiTypeName 	: String,    //api类名
    apiItemTitle    : String, //api名称
    apiItemDetailMD : String //api详细
});
//
module.exports = apiItemModel;