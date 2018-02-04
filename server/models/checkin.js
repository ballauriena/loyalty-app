const knex = require('../db/knex.js');

function Checkin() {}

Checkin.all = function() {
	return knex('checkins');
}

Checkin.create = function(userId) {
	const checkin = {
		user_id: parseInt(userId),
		points: 20
	}

	return this.all().returning('id').insert(checkin);
}

Checkin.findByUser = function(userId) {
	return knex.select('users.*', knex.raw('SUM(checkins.points) as total_points'), knex.raw('COUNT(checkins.id) as total_checkins'))
		.from('checkins')
		.join('users', 'users.id', 'checkins.user_id')
		.where('users.id', userId)
		.groupBy('users.id')
}

module.exports = Checkin;
