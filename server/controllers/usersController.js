const User = require('../models/user.js');
const UserValidator = require('../services/userValidator.js');
const Checkin = require('../models/checkin.js');

const UsersController = {
    create: function(req, res, next) {
        const user = new User(req.body);
        const validator = new UserValidator(user);

        return validator.run().then(function() {
            if (validator.isPassing()) {
                return User
                    .create(user.toRecord())
                    .then(function(userIds) {
                        const checkin = new Checkin(userIds[0], 50);

                        return checkin.generate()
                            .then(function() {
                                res.status(201).send({ userId: checkin.userId });
                            })
                            .catch(function(err) {
                                next(err);
                            });
                    })
                    .catch(function(err) {
                        next(err);
                    });
            } else {
                res.status(400).send(validator.errorsString());
            }
        });
    },
    show: function(req, res, next) {
        return User
            .findByPhone(req.params.phone)
            .then(function(user) {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).send("User not found.");
                }
            })
            .catch(function(err) {
                next(err);
            });
    }
}

module.exports = UsersController;
