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

        sqlQuery('select * from book_info where uId = ?', [user], function (err,results,fields) {
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
        const params = {
            bookid: req.body.bookid,
            sp: req.body.bookPageNumberS,
            ep: req.body.bookPageNumberE
        };
        sqlQuery('insert into read_log(uId,bookid,day,start_page,end_page) values(?,?,?,?,?)', [uid, params.bookid,date,params.sp,params.ep], function (err,results,fields) {
            if(err) {
                res.json(err);
            } else {
                res.json({
                    state: 1
                })
            }
        })
    },
    queryReviewInfo (req, res, next) {
        const date = moment().format('YYYY-MM-DD');
        reviewinfoModel.find({reviewDate: date}, function (err, docs) {
            if(err) {
                res.json({
                    state: 0
                });
            }else {
                res.json(docs);
            }
        });
    },
    checkReview (req, res, next) {
        const params = {
            bookName: req.body.bookName,
            bookPageNumberS: req.body.bookPageNumberS,
            bookPageNumberE: req.body.bookPageNumberE
        };

        const now = moment().format('YYYY-MM-DD');
        const index = req.body.reviewDate.indexOf(now);
        req.body.reviewDate.splice(index, 1);

        reviewinfoModel.update(params, {$set: {reviewDate: req.body.reviewDate}}, function (err, docs) {
            if(err) {
                res.json({
                    state: 0
                });
            }else {
                res.json({
                    state: 1
                });
            }
        })
    },
    deleteBook (req, res, next) {
        bookModel.deleteOne({bookName: req.body.bookName}, function (err, docs) {
            if(err) {
                res.json({
                    state: 0
                })
            }else {
                res.json({
                    state: 1
                })
            }
        });
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