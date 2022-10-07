const { orderBy, uniqWith } = require('lodash')
const Message = require('../models/message')
const { notifyUsers } = require('./notification')

exports.create = async (req, res) => {
	try {
		const message = await (
			await Message.create({ ...req.body, sender: req.user.id })
		).populate('sender receiver')

		notifyUsers('Message', 'Mesages has been Successfully')
		res.status(201).send({ status: res.statusCode, body: message })
	} catch (error) {
		// console.log(error)
		res.status(401).send({ message: 'Error creating Message', error })
	}
}
exports.getAllMessage = async (req, res) => {
	// console.log(req.user.id, req.params.receiver)
	try {
		const message = await Message.find({
			$or: [
				{ sender: req.user.id, receiver: req.params.receiver },
				{ sender: req.params.receiver, receiver: req.user.id },
			],
		}).populate('sender receiver')

		res.status(201).send({ status: res.statusCode, body: message })
	} catch (error) {
		// console.log(error)
		res.status(401).send({ message: 'Error reading Message', error })
	}
}

exports.getAllConnectedUser = async (req, res) => {
	// console.log('X: ', req.auth, req.user.id)
	try {
		const message = await Message.find({
			$or: [{ sender: req.user.id }, { receiver: req.user.id }],
		}).populate('sender receiver')

		var filteredUsers = uniqWith(message, function (arrVal, othVal) {
			return arrVal.receiver._id === othVal.receiver._id
		}).filter(
			(msg) =>
				msg.sender._id != req.user.id || msg.receiver._id != req.user.id
		)

		res.status(201).send({ status: res.statusCode, body: filteredUsers })
	} catch (error) {
		// console.log(error)
		res.status(401).send({ message: 'Error reading Message' })
	}
}
