/**
 * Created by zzx on 2017/11/13.
 */

const bookModel = require('../model/book');
const reviewinfoModel = require('../model/reviewinfo');

const moment = require('moment');


const bookController = {
    addBook (req, res, next) {
        bookModel.find({bookName: req.body.bookName}, function (err, docs) {
            if(err) {
                res.json({
                    state: 0
                });
            }else {
                if(docs.length === 0) {
                    let parmas = req.body;
                    parmas.process = '0';
                    bookModel.create(parmas, function (err, docs) {
                        if(err) {
                            res.json({
                                state: 0
                            });
                        }else if(docs) {
                            res.json({
                                state: 1
                            })
                        }
                    });
                }else {
                    res.json({state: 2});

                }
            }
        });
    },
    queryBookInfo (req, res, next) {
        bookModel.find({}, function (err, docs) {
            if(err) {
                res.json({
                    state: 0
                });
            }else {
                res.json(docs);
            }
        });
    },
    addReading (req, res, next) {
        const parmas = req.body;
        parmas.reviewDate = getFullData();

        if(parmas.bookPageNumberS > parmas.bookPageNumberE) {
            const temp = parmas.bookPageNumberS;
            parmas.bookPageNumberS = parmas.bookPageNumberE;
            parmas.bookPageNumberE = temp;
        }


        reviewinfoModel.create(parmas, function (err, docs) {
            if(err) {
                res.json({state: 0});
            }else {
                reviewinfoModel.find({bookName: parmas.bookName}, function (err, docs) {
                    if(err) {
                        console.log(err);
                    } else {
                        const progress = getProgess(parmas.bookPageNumber, docs);
                        console.log(progress)
                        bookModel.update({bookName: parmas.bookName}, {progress: progress}, function(err, docs) {
                            if(err) {
                                console.log(err);
                            }else {
                                console.log('更新进度成功！');
                            }
                        })
                    }
                });
                res.json({state: 1});
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