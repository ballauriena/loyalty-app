const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api/v1', require('./routes/users.js'));
app.use('/api/v1', require('./routes/checkins.js'));


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
