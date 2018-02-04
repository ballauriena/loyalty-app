const Checkin = require('../models/checkin.js');
const CheckinValidator = require('../services/checkinValidator.js');

const CheckinsController = {
	create: function(req, res, next) {
		const userId = parseInt(req.params.userId);
		const validator = new CheckinValidator(userId);

		return validator.run().then(function() {
			if (validator.isPassing()) {
				const checkin = new Checkin(userId)

				return checkin.generate()
					.then(function() {
						res.status(201).send({ userId: checkin.userId })
					})
					.catch(function(err) {
						next(err);
					});
			} else {
				res.status(403).send(validator.errorsString());
			}
		});
	},
	index: function(req, res, next) {
		return Checkin
			.forUser(req.params.userId)
			.then(function(checkinData) {
				if (checkinData) {
					res.status(200).json(checkinData);
				} else {
					res.status(404).send("Error retrieving checkin data.");
				}
			})
			.catch(function(err) {
				next(err);
			});
	}
}

module.exports = CheckinsController;
