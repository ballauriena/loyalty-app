const knex = require('../db/knex.js');

function Checkin() {}

Checkin.create = function(userId, points = 20) {
	const checkin = {
		user_id: parseInt(userId),
		points: points
	}

	return knex('checkins').returning('id').insert(checkin);
}

Checkin.aggregateByUser = function(userId) {
	return knex.select('users.*', knex.raw('SUM(checkins.points) as total_points'), knex.raw('COUNT(checkins.id) as total_checkins'))
		.from('checkins')
		.join('users', 'users.id', 'checkins.user_id')
		.where('users.id', userId)
		.groupBy('users.id')
}

Checkin.mostRecentByUser = function(userId) {
	return knex.select('*')
		.from('checkins')
		.where('user_id', userId)
		.orderBy('created_at', 'desc')
		.first();
}

module.exports = Checkin;
