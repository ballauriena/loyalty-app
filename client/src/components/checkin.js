const Checkin = {
	oninit: function(vnode) {
		console.log("initialized")
	},
	view: function() {
		return m("main", {}, [
			m("div", { class: "ui massive transparent input" }, [
				m("input", { type: "text", placeholder: "Phone Number" })
			])
		]);
	}
}

module.exports = Checkin;
