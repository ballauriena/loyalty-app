const Checkin = require("./components/checkin.js")

m.route(document.body, "/", {
	"/": {
		onmatch: function (args, requestedPath) {
			return m.request({
			    method: "GET",
			    url: "/api/test"
			})
			.then(function(result) {
			    console.log(result)
				return Checkin
			})
		}
	}
});
