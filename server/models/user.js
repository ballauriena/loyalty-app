const knex = require('../db/knex.js');
const phoneNumberUtils = require('../utils/phoneNumber.js');

function User(data) {
	this.firstName = data.firstName;
	this.lastName = data.lastName;
	this.email = data.email;
	this.phone = data.phone;
	this.sanitizedPhone = phoneNumberUtils.sanitize(this.phone);

	this.toRecord = function() {
		return {
			first_name: this.firstName,
			last_name: this.lastName,
			email: this.email,
			phone: this.sanitizedPhone
		}
	}
}

User.create = function(user) {
	return knex('users').returning('id').insert(user);
}

User.findByPhone = function(phone) {
	return knex('users').where({ phone: phoneNumberUtils.sanitize(phone) }).first();
}

User.findByEmail = function(email) {
	return knex('users').where({ email: email }).first();
}


module.exports = User;
