/**
 * Created by Administrator on 2017/10/24/024.
 */

// const test = require('../../model/test/test');
// const moment = require('moment');
// const MongoClient = require('mongodb').MongoClient;
// const DB_CONN_STR = 'mongodb://localhost:27017/learnyoumongo';

const test = {
    test: function (req, res, next) {
            res.json({test: 'sucess'});
    }
};

module.exports = test;