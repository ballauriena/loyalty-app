const knex = require('../db/knex.js');
const CheckinQueries = require('../queries/checkinQueries.js');

function Checkin() {}

Checkin.create = function(userId, points = 20) {
	const checkin = {
		user_id: parseInt(userId),
		points: points
	};

	return CheckinQueries.insert(checkin);
}

Checkin.forUser = function(userId) {
	return CheckinQueries.filterBy('user_id', userId);
}

Checkin.mostRecentByUser = function(userId) {
	const filteredByUser = CheckinQueries.filterBy('user_id', userId);
	return CheckinQueries.mostRecent('created_at')(filteredByUser);
}

module.exports = Checkin;
