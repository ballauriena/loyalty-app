const state = require('../state.js');

function handleCheckout() {
	m.route.set("/");
};

const Dashboard = {
	view: function() {
		return m("div", { class: "ui raised very padded text container segment" }, [
			m("h1", { class: "ui icon header" }, [
				m("i", { class: "star half empty icon" }),
				m("div", { class: "content" }, [
					`${state.store.user.first_name}'s Dashboard`,
					m("div", { class: "sub header" }, "View your points and checkin total here")
				])
			]),
			m("h3", { class: "ui icon header" }, [
				m("i", { class: "thumbs outline up icon" }),
				m("div", { class: "content" }, [
					state.store.totalPoints,
					m("div", { class: "sub header" }, "POINTS")
				])
			]),
			m("h3", { class: "ui icon header" }, [
				m("i", { class: "hand spock icon" }),
				m("div", { class: "content" }, [
					state.store.totalCheckins,
					m("div", { class: "sub header" }, "CHECKINS")
				])
			]),
			m("button", { class: "ui basic massive olive button", onclick: handleCheckout }, "Checkout")
		]);
	}
}

module.exports = Dashboard;
