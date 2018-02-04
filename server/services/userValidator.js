const User = require('../models/user.js');

function UserValidator(user) {
	this.user = user;
	this.errors = [];

	this.isPassing = function() {
		return this.errors.length === 0;
	}

	this.errorsString = function() {
		return this.errors.join(' ');
	}

	this.isPhoneUnique = function() {
		const errors = this.errors;

		return User
			.findByPhone(this.user.sanitizedPhone)
			.then(function(user) {
				if (user) errors.push("Duplicate phone number");
			})
			.catch(function(err) {
				console.log(err);
			})
	}

	this.isPhoneValid = function(val) {
		const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		const match = val.match(regex);

		return match ? true : false;
	}

	this.isEmailValid = function(val) {
		const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		const match = val.match(regex);

		return match ? true : false;
	}

	this.isEmailUnique = function() {
		const errors = this.errors;

		return User
			.findByEmail(this.user.email)
			.then(function(user) {
				if (user) errors.push("Duplicate email.");
			})
			.catch(function(err) {
				console.log(err);
			})
	}

	this.run = function() {
		if (!this.isPhoneValid(this.user.phone)) this.errors.push('Invalid phone number.')
		if (!this.isEmailValid(this.user.email)) this.errors.push('Invalid email.')

		const promises = [this.isPhoneUnique(), this.isEmailUnique()];
		return Promise.all(promises);
	}
}

module.exports = UserValidator;
