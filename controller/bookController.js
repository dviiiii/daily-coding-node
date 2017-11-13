/**
 * Created by zzx on 2017/11/13.
 */

const bookModel = require('../model/book');

const bookController = {
    addBook (req, res, next) {
        console.log(req.body);
        bookModel.create(req.body, function (err, docs) {
            if(err) {
                res.json((err));
            }else if(docs) {
                res.json({
                    state: 1
                })
            }
        })
    }
    // login: function (req, res, next) {
    //     const params = {
    //         user: req.body.user
    //     };
    //     userModel.find(params, function (err, docs) {
    //         if(err) {
    //             res.json(err);
    //         }else if(docs){
    //             console.log(docs[0])
    //             if(req.body.psd === docs[0].psd) {
    //                 res.json({
    //                     state: 0
    //                 });
    //             }else {
    //                 res.json({
    //                     state: 1
    //                 });
    //             }
    //         }else {
    //             res.json({
    //                 state: 1
    //             });
    //         }
    //     });
    // }
};


module.exports = bookController;