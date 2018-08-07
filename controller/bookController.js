/**
 * Created by zzx on 2017/11/13.
 */

const moment = require('moment');
const sqlQuery = require('../sql/db');

const bookController = {
    addBook (req, res, next) {
        const uid = 'admin';//TODO 需要更换为动态获取
        const params = {
            bookName: req.body.bookName,
            bookPageNumber: req.body.bookPageNumber,
            bookSort: req.body.bookSort
        };

        sqlQuery('select id from book_info where uId = ? and bookname =?', [uid, params.bookName], function (err,results,fields) {
            if(err) {
                res.json(err);
            } else if(results.length) {
                res.json({
                    state: 0,
                    msg: '不能重复添加同一书籍！'
                })
            } else {
                sqlQuery('insert into book_info(uId, bookname, pagenumber, sort, status) values(?,?,?,?,0)',[uid, params.bookName, params.bookPageNumber, params.bookSort], function (err,results,fields) {
                    if(err) {
                        res.json(err);
                    } else {
                        res.json({
                            state: 1,
                            msg: '书籍新增成功！'
                        })
                    }
                })
            }


        });
    },
    queryBookList (req, res, next) {
        const user = 'admin';
        console.log(user);
        sqlQuery('select * from book_info where uId = ? AND is_delete = 0', [user], function (err,results,fields) {
                if(err) {
                    res.json(err);
                } else {
                    res.json(results)
                }
        })
    },
    addReading (req, res, next) {

        const uid = 'admin';
        const date = moment().format('YYYY-MM-DD');
        const review_date = moment().add(1, 'days').format('YYYY-MM-DD');
        const params = {
            bookid: req.body.bookid,
            sp: req.body.bookPageNumberS,
            ep: req.body.bookPageNumberE,
            uid: uid,
            pagenumber: req.body.pagenumber
        };
        sqlQuery('insert into read_log(uId,bookid,day,start_page,end_page, review_day) values(?,?,?,?,?,?)', [uid, params.bookid,date,params.sp,params.ep, review_date], function (err,results,fields) {
            if(err) {
                console.log(err)
                res.json({
                    state: 1,
                    meg: err
                });
            } else {
                bookController.updateProgess(params);
                res.json({
                    state: 0
                })
            }
        });


    },
    queryReviewInfo (req, res, next) {
        const uid = 'admin';
        const sql = "SELECT a.id, bookname, start_page, end_page, review_times FROM read_log a INNER JOIN book_info b on a.uId = ? and a.bookid = b.id AND a.uId = b.uId AND  b.sort = '0' AND review_times < 5 AND review_day <= CURDATE()";
        sqlQuery(sql, [uid], function (err,results,fields) {
            if(err) {
                console.log(err)
                res.json({
                    state: 1,
                    meg: err
                });
            } else {
                res.json({
                    state: 0,
                    data: results
                })
            }
        });
    },
    checkReview (req, res, next) {
        const params = {
            id: req.body.id,
            review_times: req.body.review_times
        };

        let nextDate;
        switch (params.review_times) {
            case 0 :  nextDate = moment().add(1, 'days').format('YYYY-MM-DD'); break;
            case 1 :  nextDate = moment().add(2, 'days').format('YYYY-MM-DD'); break;
            case 2 :  nextDate = moment().add(4, 'days').format('YYYY-MM-DD'); break;
            case 3 :  nextDate = moment().add(7, 'days').format('YYYY-MM-DD'); break;
            case 4 :  nextDate = moment().add(15, 'days').format('YYYY-MM-DD'); break;
            default: break;
        }

        const sql = 'UPDATE read_log SET review_times = review_times + 1 , review_day = ? WHERE id = ?';
        sqlQuery(sql, [nextDate, params.id], function (err,results,fields) {
            if(err) {
                console.log(err)
                res.json({
                    state: 1,
                    meg: err
                });
            } else {
                res.json({
                    state: 0
                })
            }
        });


    },
    deleteBook (req, res, next) {
        const sql = 'UPDATE book_info SET is_delete = 1 WHERE id = ?';
        const id = req.body.id;
        console.log(req.body)
        sqlQuery(sql, [id], function (err,results,fields) {
            if(err) {
                console.log(err)
                res.json({
                    state: 1,
                    meg: err
                });
            } else {
                res.json({
                    state: 0
                })
            }
        });
    },
    updateProgess(params) {
        console.log(params)
        const sql = 'SELECT start_page, end_page FROM read_log WHERE uId = ? AND bookid = ?';
        sqlQuery(sql, [params.uid, params.bookid], function (err,results,fields) {
            if(err) {
                console.log(err);
            } else {
                let readArr = [];
                for(let i in results) {
                    for(let j = Number(results[i].start_page); j <  Number(results[i].end_page) + 1; j++) {
                        if(readArr.indexOf(j) === -1) {
                            readArr.push(j);
                        }
                    }
                }

                const num = Math.floor(readArr.length*100 / params.pagenumber);
                sqlQuery('UPDATE book_info set progress = ? WHERE id = ?', [num, params.bookid], function (err,results,fields) {
                    if(err) {
                        console.log(err);
                    }
                })

            }
        })
    }

};

//得到复习时间
function getFullData() {
    const one = moment().add(1, 'd').format('YYYY-MM-DD');
    const two = moment().add(2, 'd').format('YYYY-MM-DD');
    const four = moment().add(4, 'd').format('YYYY-MM-DD');
    const seven = moment().add(7, 'd').format('YYYY-MM-DD');
    const fifteen = moment().add(15, 'd').format('YYYY-MM-DD');

    return [one, two, four, seven, fifteen];
}

//得到进度
function getProgess(pageNumber, docs) {
    let arr = [];

    for(let i in docs) {
        for(let start = parseInt(docs[i].bookPageNumberS), end = parseInt(docs[i].bookPageNumberE); start < end; start++) {
            if(!arr[start]) arr[start] = 1;
        }
    }

    const result = arr.filter((x) => { return x === 1 });
    return parseInt(result.length*100/pageNumber);
}


module.exports = bookController;