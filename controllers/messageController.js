const { orderBy } = require('lodash')
const Message = require('../models/message')




exports.create = async (req, res) => {
	try {
		const message = await Message.create(req.body)
		res.status(201).send({ status: res.statusCode, body: message })
	} catch (error) {
		console.log(error);
		res.status(401).send({ message: 'Error creating Message' })
	}
}
exports.getAllMessage = async (req, res) => {
    console.log(req.auth,req.user)
	try {
		const message = await Message.find({
            $or: [
                {sender: req.user, receiver: req.params.receiver},
                {sender: req.params.receiver, receiver: req.user},
            ]
        }).populate("sender receiver")
        
		res.status(201).send({ status: res.statusCode, body: message })
	} catch (error) {
        console.log(error)
		res.status(401).send({ message: 'Error reading Message' })
	}
}

exports.getAllConnectedUser = async (req, res) => {
    console.log(req.auth,req.user)
	try {
		const message = await Message.find({
            $or: [
                {sender: req.user},
                {receiver: req.user},
            ]
        }).populate("sender receiver")
        
    const filteredUsers = orderBy(message, "sender._id","receiver._id")
		res.status(201).send({ status: res.statusCode, body: filteredUsers })
	} catch (error) {
        console.log(error)
		res.status(401).send({ message: 'Error reading Message' })
	}
}



