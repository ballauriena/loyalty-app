const model = require('../models/checkin.js');

const CheckinsController = {
	create: function(req, res, next) {
		return model.create(req.params.userId)
			.then(function(checkinIds) {
				res.status(201).send({ checkinId: checkinIds[0] })
			})
			.catch(function(err) {
				next(err);
			});
	},
	index: function(req, res, next) {
		return model
			.findByUser(req.params.userId)
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
