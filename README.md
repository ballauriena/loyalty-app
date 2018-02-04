# loyalty-app

###Setup:
- clone the repo to your projects directory
- cd into the project root
- run `npm install` to install relevant node packages


###Database:
- You will need postgres installed and running on your machine in order to set up a database to develop against.
- Create a new db manually through the postgres console via the `CREATE DATABASE <db_name>` command.


###Email Setup:
- For development purposes, you can create an Ethereal account for free here: https://ethereal.email/. They will provide you with a mail host, port, user, and password.


###Environment:
- run `npm run env` to generate a .env file from .env.example
- update the variable names in the .env file that gets generated (with the database and mail credentials that you set up above) to reflect your dev environment

Start it up:
	- run `npm start` in order to start both the client and server.
	- If you leave the default ports that are set up in .env.example, your server code will be running on port 3000 and your client on port 8080.
	- Visit http://localhost:8080/ in the browser to start using the app.
