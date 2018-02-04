const UserQueries = require('../queries/userQueries.js');
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
	return UserQueries.insert(user);
}

User.findByPhone = function(phone) {
	return UserQueries.findByField('phone', phoneNumberUtils.sanitize(phone));
}

User.findByEmail = function(email) {
	return UserQueries.findByField('email', email);
}


module.exports = User;
