const knex = require('../db/knex.js');

function UserQueries() {
    this.tableName = 'users';

    this.base = function() { return knex(this.tableName) }

    this.insert = function(user) {
        return this.base().returning('id').insert(user);
    }

    this.findByField = function(field, val) {
        return this.base().where(field, val).first();
    }
}

module.exports = new UserQueries();
