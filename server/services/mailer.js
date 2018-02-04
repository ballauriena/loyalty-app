const nodemailer = require('nodemailer');

const Mailer = function(recipientEmail, points, checkins) {

	this.transporter = nodemailer.createTransport({
	    host: 'smtp.ethereal.email',
	    port: 587,
	    auth: {
	        user: 'ehbitrqk2gnm4k42@ethereal.email',
	        pass: 'b3GxXGCXEqVjAfw7jy'
	    }
	});

	this.options = {
		from: 'test@loyaltyapp.com',
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
