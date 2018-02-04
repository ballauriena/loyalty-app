const userRouter = require('./users.js');
const checkinRouter = require('express').Router({ mergeParams: true });
const controller = require('../controllers/checkinsController.js');

userRouter.use('/:userId/checkins', checkinRouter);

checkinRouter.post('/', controller.create);
checkinRouter.get('/', controller.index);

module.exports = checkinRouter;
