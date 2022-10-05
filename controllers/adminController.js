// Models
const Donation = require('../models/donation')
const Request = require('../models/request')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendMail } = require('../utils')

// Get All Donation Post by status
exports.getAllDonationsByStatus = async (req, res) => {
	const { status } = req.params
	try {
		const donations =
			status === 'all'
				? await Donation.find()
				: await Donation.find({ status })

		res.status(200).send({
			message: 'Donation Posts of status: ' + status,
			body: donations,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations' })
	}
}
