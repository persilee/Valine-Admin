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
    let emailContent = '<div style="background: white; width: 80%; margin: auto auto; border-radius: 5px; border:orange 1px solid; overflow: hidden; -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12); box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.18);">' +
        '<span>' +
        '<a href="#">' +
        '<img style="width:100%;z-index: 666;" src="https://lishaoy.net/images/boy.jpg" />' +
        '</a>' +
        '</span>' +
        '<di style="padding: 5px 20px;">' +
        '<p style="position: relative; color: white; float: left; z-index: 999; background: orange; padding: 5px 30px; margin: -25px auto 0 ; box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.30)">' +
        '<span>Dear  ' + parentComment.get('nick') +
        '</span>' +
        '</p>' +
        '<h3> <span > 您有一条来自' +
        '<a style="text-decoration: none;color: orange" target="_blank" href="' +
        process.env.SITE_URL +
        '">' + currentComment.get('nick') + '</a>的回复</span>' +
        '</h3>' +
        '<p style="font-size: 14px;">< span > 您在《' +
        process.env.SITE_NAME +
        '》上发表的评论：</span></p >' +
        '<div style="border-bottom:#ddd 1px solid;border-left:#ddd 1px solid;padding-bottom:20px;background-color:#eee;margin:15px 0px;padding-left:20px;padding-right:20px;border-top:#ddd 1px solid;border-right:#ddd 1px solid;padding-top:20px">' +
        parentComment.get('comment') +
        '</div>' +
        '<p style="font-size: 14px;">' +
        '<span>' + currentComment.get('nick') + '  给您的回复如下：</span></p>' +
        '<div style="border-bottom:#ddd 1px solid;border-left:#ddd 1px solid;padding-bottom:20px;background-color:#eee;margin:15px 0px;padding-left:20px;padding-right:20px;border-top:#ddd 1px solid;border-right:#ddd 1px solid;padding-top:20px">' +
        currentComment.get('comment') +
        '</div>' +
        '<p style="font-size: 14px;"><span><a style="text-decoration: none;color: orange" target="_blank" href="' +
        process.env.SITE_URL +
        '">persilee\'s blog</a>双手呈上~</span ></p>' +
        '<div style="text-align: center;"><span><img src="https://i.loli.net/2018/03/19/5aafd2e0ae335.png" alt="hr" style="max-height:30px;margin:5px auto 5px auto;display: block;"/><a style="text-transform: uppercase; text-decoration: none; font-size: 14px; border: 2px solid #6c7575; color: #2f3333; padding: 10px; display: inline-block; margin: 10px auto 0;"target="_blank" href="' +
        process.env.SITE_URL + currentComment.get('url') +
        '">点击查看回复的完整內容</a></span></div>' +
        '<p style="font-size: 14px;text-align: center;"><span>本邮件为系统自动发出，请勿直接回复</span></p><p style="font-size: 12px;text-align: center;color: #999;"><span>Copyright © persilee\'s blog</span></p>' +
        '</div></div>';

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
