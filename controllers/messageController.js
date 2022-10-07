const { orderBy } = require('lodash')
const Message = require('../models/message')
const { notifyUsers } = require('./notification')

exports.create = async (req, res) => {
	try {
		const message = await Message.create(req.body)
		notifyUsers('Donation', 'has been Successfully approved')
		res.status(201).send({ status: res.statusCode, body: message })
	} catch (error) {
		console.log(error)
		res.status(401).send({ message: 'Error creating Message' })
	}
}
exports.getAllMessage = async (req, res) => {
	// console.log(req.auth, req.user)
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
		res.status(401).send({ message: 'Error reading Message' })
	}
}

exports.getAllConnectedUser = async (req, res) => {
	// console.log(req.auth, req.user)
	try {
		const message = await Message.find({
			$or: [{ sender: req.user.id }, { receiver: req.user.id }],
		}).populate('sender receiver')

		const filteredUsers = orderBy(message, 'sender._id', 'receiver._id')
		res.status(201).send({ body: filteredUsers })
	} catch (error) {
		// console.log(error)
		res.status(401).send({ message: 'Error reading Message', error })
	}
}
