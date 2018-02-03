const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send('Setting up!');
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
