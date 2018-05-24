/**
 * Created by Administrator on 2017/10/25/025.
 */

// const loginuserModel = require('../model/login');
const query = require('../sql/db');
const crypto = require('crypto');


const loginControll = {
    login: function (req, res, next) {
        const hashPsd = crypto.createHmac('sha256', req.body.psd)
            .update('do').update('you').update('know').update('java')
            .digest('hex');
        const params = {
            user: req.body.user
        };
        query("select uPsd from loginusers where uId = ?", [params.user], function(err,results,fields){
                if(err) {
                    res.json(err);
                }else if(results[0]){
                    if(hashPsd === results[0].uPsd) {
                        res.json({
                            state: 1
                        });
                    }else {
                        res.json({
                            state: 0
                        });
                    }
                }else {
                    res.json({
                        state: 0
                    });
                }
        });
                // loginuserModel.find(params, function (err, docs) {
        //     console.log(params)
        //     console.log(docs)
        //     if(err) {
        //         res.json(err);
        //     }else if(docs.length !== 0){
        //
        //         if(req.body.psd === docs[0].psd) {
        //             res.json({
        //                 state: 1
        //             });
        //         }else {
        //             res.json({
        //                 state: 0
        //             });
        //         }
        //     }else {
        //         res.json({
        //             state: 0
        //         });
        //     }
        // });
    }
};


module.exports = loginControll;