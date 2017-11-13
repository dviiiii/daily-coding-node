/**
 * Created by Administrator on 2017/10/25/025.
 */
// 准备工作
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
const loginuserModel = mongoose.model('loginuser', {
    user 	: String,    //账号
    psd 	: String    //密码
});
//
module.exports = loginuserModel;