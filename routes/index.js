var express = require('express');
var router = express.Router();
const { getConnection } = require('typeorm');
const Assign = require('../schemas/assign');

router.get('/', function(req, res, next) {
	const connection = getConnection();
	const repository = connection.getRepository(Assign.options.name);
	repository.find().then((result) => {
		res.status(200).json(result);
	});
});

router.post('/', function(req, res, next) {
	const newChannel = req.body;
	const connection = getConnection();
	const repository = connection.getRepository(Assign.options.name);
	repository.save({
		channelName: newChannel.name,
	});
	res.status(201).json();
});

module.exports = router;