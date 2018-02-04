const Checkin = require('../models/checkin.js');
const CheckinValidator = require('../services/checkinValidator.js');

const CheckinsController = {
	create: function(req, res, next) {
		const userId = req.params.userId;
		const validator = new CheckinValidator(userId);

		return validator.run().then(function() {
			if (validator.isPassing()) {
				return Checkin.create(userId)
					.then(function(checkinIds) {
						res.status(201).send({ checkinId: checkinIds[0] })
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
