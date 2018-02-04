require('dotenv').config();
const fs = require('fs');

fs.createReadStream('.env.example')
  .pipe(fs.createWriteStream('.env'));
