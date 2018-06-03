/**
 * Created by zzx on 2017/11/15.
 */
const schedule = require('node-schedule');
const sqlQuery = require('../sql/db');
const sendEmail = require('../controller/sendEmail');
const moment = require('moment');

function checkReading() {
    const uid = 'admin';
    const sql = "SELECT a.id, bookname, start_page, end_page, review_times FROM read_log a INNER JOIN book_info b on a.uId = ? and a.bookid = b.id AND a.uId = b.uId AND  b.sort = '0' AND review_times < 5 AND review_day <= CURDATE()";
    sqlQuery(sql, [uid], function (err,results,fields) {
        if(err) {
            console.log(err)
        } else {
            if(results.length !== 0) {

                let textArr = [];
                for(let i in results) {
                    textArr.push(results[i].bookname + ':' + results[i].start_page + '-' + results[i].end_page + ';');
                }
                console.log('今天待读书籍：' + textArr.join(''))
                sendEmail.sendInfo('今天待读书籍：' + textArr.join(''));
            }
        }
    });
    schedule.scheduleJob('0 0 8 * * *', function () {
        const date = moment().format('YYYY-MM-DD');
    })
}

// checkReading();