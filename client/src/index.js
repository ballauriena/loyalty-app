const CheckinForm = require("./components/checkinForm.js");
const Dashboard = require("./components/dashboard.js");

m.route(document.getElementsByTagName("main")[0], "/", {
	"/": CheckinForm,
	"/dashboard": Dashboard
	// "/": {
	// 	onmatch: function (args, requestedPath) {
	// 		return m.request({
	// 		    method: "GET",
	// 		    url: "/api/v1/test"
	// 		})
	// 		.then(function(result) {
	// 		    console.log(result)
	// 			return Checkin
	// 		})
	// 	}
	// }
});
