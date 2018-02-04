const Checkin = require("./components/checkin.js");
const Dashboard = require("./components/dashboard.js");

m.route(document.body, "/", {
	"/": Checkin,
	"/dashboard/:key": {
		onmatch: function(args, requestedPath) {

		}
	}
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
