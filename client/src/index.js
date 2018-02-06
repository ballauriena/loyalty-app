const CheckinForm = require("./components/checkinForm.js");
const RegistrationForm = require("./components/registrationForm.js");
const Dashboard = require("./components/dashboard.js");

m.route.prefix("#!");

m.route(document.getElementsByTagName("main")[0], "/", {
    "/": CheckinForm,
    "/register": RegistrationForm,
    "/dashboard": Dashboard
});
