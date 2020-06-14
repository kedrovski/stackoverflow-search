const nodemailer = require('nodemailer');

function sendMail(res, config, sendTo, password) {
    let transporter = nodemailer.createTransport({
        service: 'Yandex',
        auth: {
            user: config.email_login,
            pass: config.email_password,
        }
    });
    let text = `<p>Your new random password: ${password}</p>`;
    let mailOptions = {
        from: config.email_login,
        to: sendTo,
        subject: 'Restore password',
        html: text,
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.send({ success: false, msg: 'Something went wrong..' });
        } else {
            console.log('Message sent: ' + info.response);
            res.send({ success: true, msg: 'Message sent successfully!' });
        };
    });
}

exports.sendMail = sendMail;