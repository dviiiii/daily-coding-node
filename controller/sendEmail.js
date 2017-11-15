/**
 * Created by zzx on 2017/11/15.
 */
const nodemailer = require('nodemailer');

const sendEmail = {
    sendInfo (text) {
        const transporter = nodemailer.createTransport({
            service: '163',
            auth: {
                user: 'dviiiii931245@163.com',
                pass: 'foryou931245wei' //授权码,通过QQ获取

            }
        });

        const mailOptions = {
            from: 'dviiiii931245@163.com', // 发送者
            to: '913284195@qq.com', // 接受者,可以同时发送多个,以逗号隔开
            subject: '今日读书提醒', // 标题
            text: '今日读书提醒', // 文本
            html: `<h2>${text}</h2>`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('发送成功');
        });
    }
};




module.exports = sendEmail;