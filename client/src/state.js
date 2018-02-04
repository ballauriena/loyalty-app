const state = {
	phone: "",
	firstName: "",
	lastName: "",
	email: "",

}

state.setPhone = function(val) { state.phone = val }
state.setFirstName = function(val) { state.firstName = val }
state.setLastName = function(val) { state.lastName = val }
state.setEmail = function(val) { state.email = val }

module.exports = state;
