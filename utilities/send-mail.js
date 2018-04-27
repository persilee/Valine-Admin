'use strict';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

exports.notice = (comment) => {
    let emailSubject = '👉 咚！「' + process.env.SITE_NAME + '」上有新评论了';
    let emailContent = '<div style="background-color:white;border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;width:500px;margin:50px auto;color:#555555;font-family:\'Century Gothic\',\'Trebuchet MS\',\'Hiragino Sans GB\',微软雅黑,\'Microsoft Yahei\',Tahoma,Helvetica,Arial,\'SimSun\',sans-serif;font-size:12px;">  \n' +
        '    <h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"><span style="color: #12ADDB;font-weight: bold;">&gt; </span>' +
        '<a href="' + process.env.SITE_URL + '">《' +
        process.env.SITE_NAME +
        '》</a> 上有一条新评论，内容如下：</h2>' +
        '<div style="padding:0 12px 0 12px;margin-top:18px">' +
        '<p><strong>' +
        comment.get('nick') +
        '</strong>&nbsp;回复说：</p>' +
        '<div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">' +
        comment.get('comment') +
        '</div>' +
        '<p><a style="text-decoration:none; color:#12addb" href="' +
        process.env.SITE_URL +
        comment.get('url') +
        '#comments" target="_blank">点击前往查看</a></p>' +
        '</div>' +
        '</div>';

    let mailOptions = {
        from: '"' + process.env.SENDER_NAME + '" <' + process.env.SENDER_EMAIL + '>',
        to: process.env.SENDER_EMAIL,
        subject: emailSubject,
        html: emailContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
}

exports.send = (currentComment, parentComment) => {
    let emailSubject = '👉 叮咚！[' + process.env.SITE_NAME + ']上的留言有了回应';
    let emailContent = '<h1>test</h1>';

    let mailOptions = {
        from: '"' + process.env.SENDER_NAME + '" <' + process.env.SENDER_EMAIL + '>', // sender address
        to: parentComment.get('mail'),
        subject: emailSubject,
        html: emailContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('邮件 %s 成功发送: %s', info.messageId, info.response);
        currentComment.set('isNotified', true);
        currentComment.save();
    });
};
