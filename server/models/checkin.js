const knex = require('../db/knex.js');
const CheckinQueries = require('../queries/checkinQueries.js');
const Mailer = require('./../services/mailer.js');

function Checkin(userId, points = 20) {
	this.userId = userId;
	this.points = points;

	this.toRecord = function() {
		return {
			user_id: this.userId,
			points: this.points
		}
	}

	this.generate = function() {
		const self = this;

		return Checkin
			.create(this.toRecord())
			.then(function() {
				self.triggerEmail();
			})
			.catch(function(err) {
				console.log(err);
			})
	}

	this.triggerEmail = function() {
		return Checkin.aggregateDataForUser(this.userId)
			.then((data) => {
				new Mailer(data[0].email, data[0].total_points, data[0].total_checkins).send();
			})
			.catch(function(err) {
				console.log(err)
			})
	}
}

Checkin.create = function(checkin) {
	return CheckinQueries.insert(checkin);
}

Checkin.forUser = function(userId) {
	return CheckinQueries.filterBy('user_id', userId);
}

Checkin.mostRecentForUser = function(userId) {
	return CheckinQueries.mostRecentForUser(userId);
}

Checkin.aggregateDataForUser = function(userId) {
	return CheckinQueries.aggregateCheckinData(userId);
}

module.exports = Checkin;
