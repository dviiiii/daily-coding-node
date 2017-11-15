/**
 * Created by zzx on 2017/11/15.
 */
const schedule = require('node-schedule');
const reviewinfoModel = require('../model/reviewinfo');
const sendEmail = require('../controller/sendEmail');

function checkReading() {
    schedule.scheduleJob('10 * * * * *', function () {
        reviewinfoModel.find({}, function (err, docs) {
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