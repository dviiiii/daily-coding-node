/**
 * Created by zzx on 2017/11/13.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
const apiTypeModel = mongoose.model('apitype', {
    apiTypeName 	: String,    //api类名
});
//
module.exports = apiTypeModel;