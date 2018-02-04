const Checkin = {
	handleCheckin: function() {
		console.log("Submitting Form");
		// validate the phone number
		// make a request to get the phone number record from the API
		// if the request is successful, redirect to the user dashboard with the user_id from the phone number
		// otherwise, mount the other form fields on the page
		m.request.send()
	},
	view: function() {
		return m("main", {}, [
			m("form", { onsubmit: this.handleCheckin }, [
				m("div", { class: "ui massive transparent action input" }, [
					m("input", { type: "text", placeholder: "Phone Number" })
				]),
				m("button", { type: "submit", class: "ui basic massive olive button" }, "Check In")
			])
		]);
	}
}

module.exports = Checkin;
