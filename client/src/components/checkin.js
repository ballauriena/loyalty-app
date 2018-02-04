const state = {
	phone: "",
	setPhone: function(val) { state.phone = val }
}


function handleCheckin() {
	// validate the phone number
	// make a request to get the phone number record from the API
	// if the request is successful, redirect to the user dashboard with the user_id from the phone number
	// otherwise, mount the other form fields on the page
	m.request({ method: "GET", url: `/api/v1/users/${state.phone}` })
		.then(function(response) {
			console.log(response);
		})
		.catch(function(err) {
			console.log(err);
		})
}

function view() {
	return m("form", { onsubmit: this.handleCheckin }, [
		m("div", { class: "ui massive transparent action input" }, [
			m("input", { type: "text", placeholder: "Phone Number", oninput: m.withAttr("value", state.setPhone), value: state.phone })
		]),
		m("button", { type: "submit", class: "ui basic massive olive button" }, "Check In")
	]);
}

module.exports = { view: view }
