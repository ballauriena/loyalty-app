const model = require('../models/user.js');
const phoneNumberUtils = require('../utils/phoneNumber.js');

const UsersController = {
	create: function(req, res, next) {
		return model
			.create(req.body)
			.then(function(userIds) {
				res.status(201).send({ userId: userIds[0] })
			})
			.catch(function(err) {
				next(err);
			});
	},
	show: function(req, res, next) {
		const phone = phoneNumberUtils.sanitize(req.params.phone);

		return model
			.findByPhone(phone)
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
