const state = require('../state.js');
const Popup = require("./popup.js");

function handleCheckin(e) {
    e.preventDefault();

    if (state.actions.validatePhone()) {
        state.actions.getUserByPhone()
            .then(function() {
                state.actions.checkinUser()
                    .catch(function(err) {
                        state.actions.addError(err.message);
                        Popup.show(state.store.errors);
                    })
            })
            .catch(function() {
                m.route.set("/register");
            })
    } else {
        Popup.show(state.store.errors);
        state.store.errorFields.forEach(function(id) {
            document.getElementById(id).classList.add("error");
        });
    }
}

const CheckinForm = {
    onremove: function() {
        state.store.phone("");
    },
    view: function() {
        return m("div", { class: "ui raised very padded text container segment", id: "formHolder" }, [
            m("form", { class: "ui form", onsubmit: handleCheckin }, [
                m("div", { class: "field", id: "phone" }, [
                    m("label", "Phone Number"),
                    m("input", { type: "tel", placeholder: "Phone Number", oninput: m.withAttr("value", state.store.phone), value: state.store.phone })
                ]),
                m("button", { type: "submit", class: "ui basic massive olive button" }, "Check In")
            ])
        ]);
    }
}

module.exports = CheckinForm;
