const CheckinForm = require("./components/checkinForm.js");
const Dashboard = require("./components/dashboard.js");

m.route.prefix("#!");

m.route(document.getElementsByTagName("main")[0], "/", {
    "/": CheckinForm,
    "/dashboard": Dashboard
});
