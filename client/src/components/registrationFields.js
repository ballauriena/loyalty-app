const state = require('../state.js');

const RegistrationFields = {
	view: function() {
		return [
			m("div", { class: "field", id: "firstName" }, [
				m("label", "First Name"),
				m("input", { type: "text", placeholder: "First Name", oninput: m.withAttr("value", state.setFirstName), value: state.firstName })
			]),
			m("div", { class: "field", id: "lastName" }, [
				m("label", "Last Name"),
				m("input", { type: "text", placeholder: "Last Name", oninput: m.withAttr("value", state.setLastName), value: state.lastName })
			]),
			m("div", { class: "field", id: "email" }, [
				m("label", "Email"),
				m("input", { type: "text", placeholder: "Email", oninput: m.withAttr("value", state.setEmail), value: state.email })
			]),
		];
	}
}

module.exports = RegistrationFields;
