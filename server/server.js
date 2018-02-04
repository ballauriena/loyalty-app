const app = require('express')();
const bodyParser = require('body-parser');

const usersRouter = require('express').Router();
const usersController = require('./controllers/usersController.js');

const checkinsRouter = require('express').Router({ mergeParams: true });
const checkinsController = require('./controllers/checkinsController.js');


app.use(bodyParser.json());


app.use('/api/v1/users', usersRouter);
usersRouter.post('/', usersController.create);
usersRouter.get("/:phone", usersController.show);


usersRouter.use('/:userId/checkins', checkinsRouter);
checkinsRouter.post('/', checkinsController.create);
checkinsRouter.get('/', checkinsController.index);


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
