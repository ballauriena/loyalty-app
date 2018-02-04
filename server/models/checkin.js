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
	// return knex.select('users.*', knex.raw('SUM(checkins.points) as total_points'), knex.raw('COUNT(checkins.id) as total_checkins'))
	// 	.from('checkins')
	// 	.join('users', 'users.id', 'checkins.user_id')
	// 	.where('users.id', userId)
	// 	.groupBy('users.id')
}

Checkin.mostRecentByUser = function(userId) {
	const filteredByUser = CheckinQueries.filterBy('user_id', userId);
	return CheckinQueries.mostRecent('created_at')(filteredByUser);
}

module.exports = Checkin;
