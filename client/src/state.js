const stream = require("mithril/stream");

let state = {
	alert: null,
	errors: [],
	errorFields: [],
	phone: stream(""),
	firstName: stream(""),
	lastName: stream(""),
	email: stream(""),
	user: null,
	checkins: null,
	totalCheckins: 0,
	totalPoints: 0
}

const actions = {
	setUser: function(user) { state.user = user },
	setCheckins: function(checkins) { state.checkins = checkins },
	clearErrors: function(msgs) { state.errors = [] },
	addError: function(msg) { state.errors.push(msg) },
	addErrorField: function(fieldId) { state.errorFields.push(fieldId) },
	setTotalCheckins: function() { state.totalCheckins = state.checkins.length },
	setTotalPoints: function() {
		state.totalPoints = state.checkins.reduce(function(total, checkin) {
			return total + checkin.points;
		}, 0);
	},

	validatePhone: function() {
		const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		console.log(state.phone());
		const match = state.phone().match(regex);

		if (match) {
			return true;
		}

		actions.addError("Phone number is not a valid format.");
		actions.addErrorField("phone");
		return false;
	},

	validateEmail: function() {
		const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		const match = state.email().match(regex);

		if (match) {
			return true;
		}

		actions.addError("Email is not a valid format.");
		actions.addErrorField("email");
		return false;
	},

	validateRegistration: function() {
		actions.clearErrors();
		if (state.firstName().length === 0) {
			actions.addError("First Name cannot be blank.");
			actions.addErrorField("firstName");
		}
		if (state.lastName().length === 0) {
			actions.addError("Last Name cannot be blank.");
			actions.addErrorField("lastName");
		}
		actions.validatePhone();
		actions.validateEmail();

		return state.errors.length === 0;
	},

	getCheckinsByUser: function() {
		return m.request({
			method: "GET",
			url: `/api/v1/users/${state.user.id}/checkins`
		})
			.then(function(response) {
				actions.setCheckins(response);
				actions.setTotalCheckins();
				actions.setTotalPoints();
			})
	},

	getUserByPhone: function() {
		actions.clearErrors();

		return m.request({
			method: "GET",
			url: `/api/v1/users/${state.phone()}`
		 })
			.then(function(response) {
				actions.setUser(response);
			})
	},

	checkinUser: function() {
		actions.clearErrors();

		return m.request({
			method: "POST",
			url: `/api/v1/users/${state.user.id}/checkins`
		})
			.then(function() {
				actions.getCheckinsByUser();
				m.route.set("/dashboard");
			})
	},

	registerUser: function() {
		const userData = {
			first_name: state.firstName(),
			last_name: state.lastName(),
			email: state.email(),
			phone: state.phone()
		};

		return m.request({
			method: "POST",
			url: "/api/v1/users",
			data: userData
		})
			.then(function(response) {
				userData.id = response.userId;
				actions.setUser(userData);
			})
			.then(function() {
				actions.getCheckinsByUser();
			})
			.then(function() {
				m.route.set("/dashboard");
			})
			.catch(function(err) {
				console.log(err);
			})
	}
}

module.exports = {
	store: state,
	actions: actions
}
