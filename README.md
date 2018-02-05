# loyalty-app

### Setup:
- Clone the repo to your projects directory.
- Cd into the project root.
- Run `npm install` to install relevant node packages.


### Database:
- You will need postgres installed and running on your machine in order to set up a database to develop against.
- Create a new db manually through the postgres console via the `CREATE DATABASE <db_name>` command.


### Email Setup:
- For development purposes, you can create an Ethereal account for free here: https://ethereal.email/. They will provide you with a mail host, port, user, and password.


### Environment:
- Run `npm run env` to generate a .env file from .env.example
- All environment variables you need to run the app are listed in that file, but some contain fake data.
- Update the variable names in the newly generated .env file (with the database and email credentials that you set up above) to reflect your dev environment.


### Migrate the Database
- Run `knex migrate:latest --env development` to build the database.
- Run  `knex seed:run --env development` to seed the database.


### Start the app:
- Run `npm start` in order to start both the client and server. The client will run in the foreground and the express server will run in the background.
- Optionally, to start them separately, you can run `npm run client` for the front end and `npm run server` for the back end.
- If you leave the default ports that are set up in .env.example, your server code will be running on port 3000 and your client on port 8080.
- Visit http://localhost:8080/ in the browser to start using the app.
