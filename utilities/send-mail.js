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
    let emailContent =
    '<div style="background: white; width:100%; max-width:740px; margin: auto; border-radius: 5px; border:#FF5722 1px solid; overflow: hidden; -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12); box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.18);">' +
        '<a href="#">' +
        '<img height="auto" style="width:100%;max-width:740px;z-index: 666;object-fit: cover;border-radius: 5px;" src="https://cdn.lishaoy.net/images/boy.png"/>' +
        '</a>' +
        '<div style="padding: 5px 20px;">' +
        '<a style="position: relative; color: white; float: left; z-index: 999; background: #FF5722; padding: 5px 30px; margin: -25px auto; box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.30)">' +
        'Dear Persilee' +
        '</a>' +
        '<span><br / ></span>' +
        '<h3> <span > 您有一条来自' +
        '<a style="text-decoration: none;color: #FF5722" target="_blank" href="' +
        process.env.SITE_URL +
        '">' + comment.get('nick') + '</a>的评论</span>' +
        '</h3>' +
        '<p style="font-size: 14px;"><span> 您在《' +
        process.env.SITE_NAME +
        '》上发表的评论：</span></p >' +
        '<center>' +
        '<div style="text-align:left;margin:6px auto;padding:10px;background: linear-gradient(to right, rgba(221, 221, 221, 0.36) 0%, rgba(221, 221, 221, 0) 90%);">' +
        comment.get('comment') +
        '</div>' +
        '</center>' +
        '<p style="font-size: 14px;"><span><a style="text-decoration: none;color: #FF5722" target="_blank" href="' +
        process.env.SITE_URL +
        '">persilee\'s blog</a> 双手呈上~</span ></p>' +
        '<div style="text-align: center;"><span><img src="https://cdn.lishaoy.net/images/mail-bottom.png" alt="hr" style="width:100%;max-height:30px;margin:5px auto 5px auto;display: block;"/><a style="text-transform: uppercase; text-decoration: none; font-size: 14px; border: 2px solid #6c7575; color: #2f3333; padding: 10px; display: inline-block; margin: 10px auto 0;"target="_blank" href="' +
        process.env.SITE_URL + comment.get('url') +
        '">点击查看回复的完整內容</a></span></div>' +
        '<p style="font-size: 14px;text-align: center;"><span>本邮件为系统自动发出，请勿直接回复</span></p><p style="font-size: 12px;text-align: center;color: #999;"><span>Copyright © persilee\'s blog</span></p>' +
        '</div></div>';

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
    let emailSubject = '👉 叮咚！[' + process.env.SITE_NAME + '] 上的留言有了回应';
    let emailContent = 
    '<div style="background: white; width:100%; max-width:740px; margin: auto; border-radius: 5px; border:#FF5722 1px solid; overflow: hidden; -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12); box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.18);">' +
        '<a href="#">' +
        '<img height="auto" style="width:100%;max-width:740px;z-index: 666;object-fit: cover;border-radius: 5px;" src="https://cdn.lishaoy.net/images/boy.png" />' +
        '</a>' +
        '<div style="padding: 5px 20px;">' +
        '<a style="position: relative; color: white; float: left; z-index: 999; background: #FF5722; padding: 5px 30px; margin: -25px auto 0 ; box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.30)">' +
        'Dear ' + parentComment.get('nick') +
        '</a>' +
        '<span><br / ></span>' +
        '<h3> <span > 您有一条来自' +
        '<a style="text-decoration: none;color: #FF5722" target="_blank" href="' +
        process.env.SITE_URL +
        '">' + currentComment.get('nick') + '</a>的回复</span>' +
        '</h3>' +
        '<p style="font-size: 14px;"><span> 您在《' +
        process.env.SITE_NAME +
        '》上发表的评论：</span></p >' +
        '<center>' +
        '<div style="text-align:left;margin:6px auto;padding:10px;background: linear-gradient(to right, rgba(221, 221, 221, 0.36) 0%, rgba(221, 221, 221, 0) 90%);">' +
        parentComment.get('comment') +
        '</div>' +
        '</center>' +
        '<p style="font-size: 14px;">' +
        '<span>' + currentComment.get('nick') + ' 给您的回复如下：</span></p>' +
        '<center>' +
        '<div style="text-align:left;margin:6px auto;padding:10px;background: linear-gradient(to right, rgba(221, 221, 221, 0.36) 0%, rgba(221, 221, 221, 0) 90%);">' +
        currentComment.get('comment') +
        '</div>' +
        '</center>' +
        '<p style="font-size: 14px;"><span><a style="text-decoration: none;color: #FF5722" target="_blank" href="' +
        process.env.SITE_URL +
        '">persilee\'s blog</a> 双手呈上~</span ></p>' +
        '<div style="text-align: center;"><span><img src="https://cdn.lishaoy.net/images/mail-bottom.png" alt="hr" style="width:100%;max-height:30px;margin:5px auto 5px auto;display: block;"/><a style="text-transform: uppercase; text-decoration: none; font-size: 14px; border: 2px solid #6c7575; color: #2f3333; padding: 10px; display: inline-block; margin: 10px auto 0;"target="_blank" href="' +
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