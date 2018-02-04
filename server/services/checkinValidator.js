const Checkin = require('../models/checkin.js');
const moment = require('moment');

function CheckinValidator(userId) {
	this.userId = userId;
	this.errors = [];

	this.isPassing = function() {
		return this.errors.length === 0;
	}

	this.errorsString = function() {
		return this.errors.join(' ');
	}

	this.run = function() {
		const errors = this.errors;

		return Checkin
			.mostRecentByUser(this.userId)
			.then(function(result) {
				const diff = moment().diff(moment(result.created_at), 'minutes');
				if (diff < 5) errors.push('Must wait 5 minutes between checkins.');
			})
			.catch(function(err) {
				console.log(err);
			});
	}
}

module.exports = CheckinValidator;
