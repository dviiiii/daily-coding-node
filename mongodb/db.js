
'use strict';

const mongoose = require('mongoose');
const config = require('../config/default');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

mongoose.connect(config.url);


const db = mongoose.connection;

db.once('open' ,function () {
    return console.log('连接数据库成功');
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(config.url);
});

module.exports = db;