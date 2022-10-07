const User = require('../models/user')
let bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const Campaign = require('../models/campaign')

// Create campaign post
exports.createCampaign = async (req, res) => {
	const { title, location, eventTime, startTime, endTime, description } =
		req.body

	try {
		const newCampaign = await Campaign.create({
			volunteer_id: req.user.id,
			volunteer_name: req.user.firstName + ' ' + req.user.lastName,
			title,
			location,
			city: req.user.city,
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

// Update campaign post
// exports.updateCampaign = async (req, res) => {
// 	const { title, location, eventTime, startTime, endTime, description } =
// 		req.body

// 	try {
// 		const campaign = await Campaign.findOne({
// 			where: { id: req.params.id },
// 		})
// 		console.log(campaign)
// 		if (campaign.volunteer_id === req.user.id) {
// 			const updatedCampaign = await campaign.update({
// 				title,
// 				location,
// 				eventTime,
// 				startTime,
// 				endTime,
// 				description,
// 				images: req.files.map((file) => file.location),
// 			})
// 			res.status(201).send({
// 				message: 'Campaign updated',
// 				body: updatedCampaign,
// 			})
// 		} else {
// 			res.status(401).send({
// 				message: 'You are not authorized to update this campaign',
// 			})
// 		}
// 	} catch (error) {
// 		res.status(401).send({ message: 'Error updating campaign', error })
// 	}
// }
