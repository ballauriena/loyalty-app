const RegistrationForm = require("./registrationForm.js");
const Popup = require("./popup.js");
const state = require('../state.js');

function handleCheckin() {
	if (state.actions.validatePhone()) {
		state
			.actions
			.getUserByPhone()
			.catch(function() {
				state.store.errorFields.forEach(function(id) {
					document.getElementById(id).classList.remove("error");
				});
				mountRegistrationForm();
			})
	} else {
		Popup.show(state.store.errors);
		state.store.errorFields.forEach(function(id) {
			document.getElementById(id).classList.add("error");
		});
	}
}

function mountRegistrationForm() {
	m.mount(document.getElementsByTagName("form")[0], RegistrationForm)
}

const CheckinForm = {
	view: function() {
		return m("form", { class: "ui form", onsubmit: handleCheckin }, [
			m("div", { class: "field", id: "phone" }, [
				m("label", "Phone Number"),
				m("input", { type: "tel", placeholder: "Phone Number", oninput: m.withAttr("value", state.actions.setPhone), value: state.store.phone })
			]),
			m("button", { type: "submit", class: "ui basic massive olive button" }, "Check In")
		]);
	}
}

module.exports = CheckinForm;
