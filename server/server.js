const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const app = express();
const config = require('../webpack.config.js');

app.use(bodyParser.json());

app.use('/api', router);

router.get('/test', function(req, res) {
  res.status(200).send({test: 'data'});
});


// GET '/'
	// aka '/checkins/new' phone number form
// POST 'checkins/create'
	// submit phone number form here, generates a new checkin
// GET '/users/new'
	// user form w/ first name, last name, email
// POST '/users/create'
	// submit user form here
// GET 'users/:id'
	// get user details/dashboard



app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
