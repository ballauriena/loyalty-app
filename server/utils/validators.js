const validators = {
	isStringValid: function(val) {
		console.log(val);
		return val && val.length > 0;
	},
	isPhoneValid: function(val) {
		const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		const match = val.match(regex);

		return match ? true : false;
	},
	isEmailValid: function(val) {
		const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		const match = val.match(regex);

		return match ? true : false;
	}
};

module.exports = validators;
