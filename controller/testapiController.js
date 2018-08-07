/**
 * Created by zzx on 2017/11/13.
 */


const testapiController = {

    queryCalendar_info (req, res, next) {
        res.json(
                {
                    status: '0',
                    weekDate: [1,2,3],
                    monthDate: 6
                }
            );
    },
    // deleteApiType (req, res, next) {
    //     apitypeModel.deleteOne({apiTypeName: req.body.apiTypeName}, function (err, docs) {
    //         if(err) {
    //             res.json({
    //                 state: 0
    //             })
    //         }else {
    //             res.json({
    //                 state: 1
    //             })
    //         }
    //     });
    // },
    // queryApiType (req, res, next) {
    //     apitypeModel.find({}, function (err, docs) {
    //         if(err) {
    //             res.json({
    //                 state: 0
    //             });
    //         }else {
    //             res.json(docs);
    //         }
    //     });
    // },
    // addApiItem (req, res, next) {
    //     apiItemModel.find({apiTypeName: req.body.apiTypeName}, function (err, docs) {
    //         if(err) {
    //             res.json({
    //                 state: 0
    //             });
    //         }else {
    //             if(docs.length === 0) {
    //                 let parmas = req.body;
    //                 apiItemModel.create(parmas, function (err, docs) {
    //                     if(err) {
    //                         res.json({
    //                             state: 0
    //                         });
    //                     }else if(docs) {
    //                         res.json({
    //                             state: 1
    //                         })
    //                     }
    //                 });
    //             }else {
    //                 res.json({state: 2});
    //
    //             }
    //         }
    //     });
    // },
    // queryApiItem (req, res, next) {
    //     let parmas = {};
    //     if(req.body.apiTypeName) {
    //         parmas.apiTypeName = req.body.apiTypeName;
    //     }
    //     if(req.body.apiItemTitle) {
    //         parmas.apiItemTitle = req.body.apiItemTitle;
    //     }
    //
    //     apiItemModel.find(parmas, function (err, docs) {
    //         if(err) {
    //             res.json({
    //                 state: 0
    //             });
    //         }else {
    //             res.json(docs);
    //         }
    //     });
    // }

};


module.exports = testapiController;