const knex = require('../db/knex.js');

function CheckinQueries() {
	this.tableName = 'checkins';

	this.base = function() { return knex(this.tableName) }

	this.insert = function(checkin) {
		return this.base().returning('id').insert(checkin);
	}

	this.filterBy = function(field, val) {
		return this.base().where(field, val);
	}

	this.mostRecentForUser = function(userId) {
		return knex.select('*')
				.from(this.tableName)
				.where('user_id', userId)
				.orderBy('created_at', 'desc')
				.first();
	}

	this.aggregateCheckinData = function(userId) {
		return knex.select('users.*', knex.raw('SUM(checkins.points) as total_points'), knex.raw('COUNT(checkins.id) as total_checkins'))
			.from('checkins')
			.join('users', 'users.id', 'checkins.user_id')
			.where('users.id', userId)
			.groupBy('users.id');
	}
}

module.exports = new CheckinQueries();
