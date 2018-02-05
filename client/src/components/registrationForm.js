const state = require('../state.js');
const Popup = require("./popup.js");

function handleRegister() {
    if (state.actions.validateRegistration()) {
        state
            .actions
            .registerUser()
            .catch(function() {})
    } else {
        Popup.show(state.store.errors);
        state.store.errorFields.forEach(function(id) {
            document.getElementById(id).classList.add("error");
        });
    }
}

const RegistrationForm = {
    view: function() {
        return m("form", { class: "ui form", onsubmit: handleRegister }, [
            m("div", { class: "field", id: "phone" }, [
                m("label", "Phone Number"),
                m("input", { type: "tel", placeholder: "Phone Number", oninput: m.withAttr("value", state.store.phone), value: state.store.phone })
            ]),
            m("div", { class: "field", id: "firstName" }, [
                m("label", "First Name"),
                m("input", { type: "text", placeholder: "First Name", oninput: m.withAttr("value", state.store.firstName), value: state.store.firstName })
            ]),
            m("div", { class: "field", id: "lastName" }, [
                m("label", "Last Name"),
                m("input", { type: "text", placeholder: "Last Name", oninput: m.withAttr("value", state.store.lastName), value: state.store.lastName })
            ]),
            m("div", { class: "field", id: "email" }, [
                m("label", "Email"),
                m("input", { type: "text", placeholder: "Email", oninput: m.withAttr("value", state.store.email), value: state.store.email })
            ]),
            m("button", { type: "submit", class: "ui basic massive olive button" }, "Check In")
        ]);
    }
}

module.exports = RegistrationForm;
