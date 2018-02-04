const RegistrationFields = require("./registrationFields.js");
const Popup = require("./popup.js");
const state = require('../state.js');

function isPhoneValid(phoneString) {
	const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	const match = phoneString.match(regex);

	return match ? true : false;
}

function handleCheckin() {
	if (isPhoneValid(state.phone)) {
		m.request({ method: "GET", url: `/api/v1/users/${state.phone}` })
			.then(function(response) {
				m.route.set(`/dashboard/${response.id}`)
			})
			.catch(function(err) {
				document.getElementById("phoneField").classList.remove("error");
				mountRegistrationFields();
			})
	} else {
		Popup.show("Please enter a valid phone number.");
		document.getElementById("phoneField").classList.add("error");
	}
}

function mountRegistrationFields() {
	m.mount(document.getElementById("registrationFields"), RegistrationFields)
}

const Checkin = {
	view: function() {
		return m("main", {}, [
			m("form", { class: "ui form", onsubmit: handleCheckin }, [
				m("div", { class: "field", id: "phoneField" }, [
					m("label", "Phone Number"),
					m("input", { type: "tel", placeholder: "Phone Number", oninput: m.withAttr("value", state.setPhone), value: state.phone })
				]),
				m("div", { id: "registrationFields" }),
				m("button", { type: "submit", class: "ui basic massive olive button" }, "Check In")
			])
		]);
	}
}

module.exports = Checkin
