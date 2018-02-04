const knex = require('../db/knex.js');
const phoneNumberUtils = require('../utils/phoneNumber.js');
const validators = require('../utils/validators.js');

function User(data) {
	this.firstName = data.firstName;
	this.lastName = data.lastName;
	this.email = data.email;
	this.phone = data.phone;
	this.sanitizedPhone = phoneNumberUtils.sanitize(this.phone);
	this.errors = [];

	this.isPhoneDuplicate = function() {
		return User
			.find({ phone: this.sanitizedPhone })
			.then(function(user) {
				return user ? true : false;
			})
			.catch(function(err) {
				console.log(err);
			})
	}

	this.isEmailDuplicate = function() {
		return User
			.find({ email: this.email })
			.then(function(user) {
				return user ? true : false;
			})
			.catch(function(err) {
				console.log(err);
			})
	}

	this.isValid = function() {
		if (!validators.isStringValid(this.firstName)) this.errors.push('Invalid first name.')
		if (!validators.isStringValid(this.lastName)) this.errors.push('Invalid last name.')
		if (!validators.isPhoneValid(this.phone)) this.errors.push('Invalid phone number.')
		if (!validators.isEmailValid(this.email)) this.errors.push('Invalid email.')
		if (this.isPhoneDuplicate(this.sanitizedPhone)) this.errors.push('Duplicate phone number.');
		if (this.isEmailDuplicate(this.email)) this.errors.push('Duplicate email.');

		return this.errors.length == 0;
	}

	this.toRecord = function() {
		return {
			first_name: this.firstName,
			last_name: this.lastName,
			email: this.email,
			phone: this.sanitizedPhone
		}
	}
}

// need to create a 50 point checkin here
User.create = function(data) {
	const model = new User(data);

	if (model.isValid()) {
		return knex('users').returning('id').insert(model.toRecord());
	} else {
		return Promise.reject(new Error(model.errors.join(' ')));
	}
}

User.findByPhone = function(phone) {
	return knex('users').where({ phone: phone }).first();
}


module.exports = User;
