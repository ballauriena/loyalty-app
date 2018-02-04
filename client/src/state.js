const state = {
	alert: null,
	checkinError: null,
	phone: "",
	firstName: "",
	lastName: "",
	email: "",
	user: null,
	checkins: null
}

state.setPhone = function(val) { state.phone = val }

state.setFirstName = function(val) { state.firstName = val }

state.setLastName = function(val) { state.lastName = val }

state.setEmail = function(val) { state.email = val }

state.setUser = function(user) { state.user = user }

state.setCheckinError = function(msg) { state.error = msg }

state.isPhoneValid = function() {
	const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	const match = state.phone.match(regex);

	if (match) {
		return true;
	}

	state.setCheckinError("Phone number is not valid.");
	return false;
}

state.getUserByPhone = function() {
	return m.request({
		method: "GET",
		url: `/api/v1/users/${state.phone}`
	 })
		.then(function(response) {
			state.setUser(response);
		})
		.then(function() {
			m.route.set(`/dashboard/${state.user.id}`);
		})
}

module.exports = state;
