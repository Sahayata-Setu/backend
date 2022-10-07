const User = require('../models/user')
let bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const Campaign = require('../models/campaign')

// Create campaign post
exports.createCampaign = async (req, res) => {
	const {
		volunteer_id,
		volunteer_name,
		title,
		location,
		city,
		eventTime,
		startTime,
		endTime,
		description,
	} = req.body

	try {
		const newCampaign = await Campaign.create({
			volunteer_id,
			volunteer_name,
			title,
			location,
			city,
			eventTime,
			startTime,
			endTime,
			description,
			images: req.files.map((file) => file.location),
		})
		res.status(201).send({
			message: 'New campaign created',
			body: newCampaign,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error creating campaign', error })
	}
}
