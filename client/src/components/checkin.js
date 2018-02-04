const RegistrationFields = require("./registrationFields.js");
const Popup = require("./popup.js");
const state = require('../state.js');

function handleCheckin() {
	if (state.isPhoneValid()) {
		state
			.getUserByPhone()
			.catch(function() {
				document.getElementById("phone").classList.remove("error");
				mountRegistrationFields();
			})
	} else {
		Popup.show(state.checkinError);
		document.getElementById("phone").classList.add("error");
	}
}

function mountRegistrationFields() {
	m.mount(document.getElementById("registrationFields"), RegistrationFields)
}

const Checkin = {
	view: function() {
		return m("main", {}, [
			m("form", { class: "ui form", onsubmit: handleCheckin }, [
				m("div", { class: "field", id: "phone" }, [
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
