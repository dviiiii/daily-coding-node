/**
 * Created by Administrator on 2017/10/25/025.
 */

const loginuserModel = require('../model/login');

const loginControll = {
    login: function (req, res, next) {
        const params = {
            user: req.body.user
        };
        loginuserModel.find(params, function (err, docs) {
            console.log(params)
            console.log(docs)
            if(err) {
                res.json(err);
            }else if(docs.length !== 0){

                if(req.body.psd === docs[0].psd) {
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
    }
};


module.exports = loginControll;