/**
 * Created by Administrator on 2017/10/25/025.
 */

const userModel = require('../model/login');

// const reviewBook = {

//     add: function (req, res, next) {
//         const data = req.body;
//         const fullData = getFullData(data);
//
//         const reviewBook = new reviewBookModel(fullData);
//         reviewBook.save(function(err) {});
//         res.json({msg: 'sucess!'})
//     }
// };
//
//
//

//

const login = {
    login: function (req, res, next) {
        const params = {
            user: req.body.user
        };
        userModel.find(params, function (err, docs) {
            if(err) {
                res.json(err);
            }else if(docs){
                console.log(docs[0])
                if(req.body.psd === docs[0].psd) {
                    res.json({
                        state: 0
                    });
                }else {
                    res.json({
                        state: 1
                    });
                }
            }else {
                res.json({
                    state: 1
                });
            }
        });
    }
};


module.exports = login;