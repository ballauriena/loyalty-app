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

	this.mostRecent = function(timeField) {
		return function(query) {
			query.orderBy(timeField, 'desc').first();
		}
	}
}

module.exports = new CheckinQueries();
