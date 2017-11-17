/**
 * Created by zzx on 2017/11/15.
 */
const schedule = require('node-schedule');
const reviewinfoModel = require('../model/reviewinfo');
const sendEmail = require('../controller/sendEmail');
const moment = require('moment');

function checkReading() {
    schedule.scheduleJob('0 0 8 * * *', function () {
        const date = moment().format('YYYY-MM-DD');
        reviewinfoModel.find({reviewDate: date}, function (err, docs) {
            if(err) {
                res.json({
                    state: 0
                });
            }else {
                if(docs.length !== 0) {
                    let textArr = [];
                    for(let i in docs) {
                        textArr.push(docs[i].bookName + ',' + docs[i].bookPageNumberS + '-' + docs[i].bookPageNumberE + ';');
                    }
                    sendEmail.sendInfo('今天待读书籍：' + textArr.join(''));
                }
            }
        });
    })
}

checkReading();