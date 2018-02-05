const nodemailer = require('nodemailer');

const Mailer = function(recipientEmail, points, checkins) {
    this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    this.options = {
        from: process.env.MAIL_SENDER,
        to: recipientEmail,
        subject: 'Thanks for checking in!',
        text: `Congratulations! You have checked in ${checkins} times, and have earned a grand total of ${points} points!`
    }

    this.send = function() {
        this.transporter.sendMail(this.options, function(err, info) {
            if(err){
                return console.log(err);
            }
            console.log('Message sent: ' + info.response);
        })
    }
};

module.exports = Mailer;
