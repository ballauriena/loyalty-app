const userRouter = require('express').Router();
const controller = require('../controllers/usersController.js');

userRouter.use('/users', userRouter);

userRouter.post('/', controller.create);
userRouter.get("/:phone", controller.show);


module.exports = userRouter;
