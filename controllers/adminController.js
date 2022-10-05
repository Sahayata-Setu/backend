// Models
const Donation = require('../models/donation')
const Request = require('../models/request')
const User = require('../models/user')
const VolunteerApplication = require('../models/volunteer_application')

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

// Approve Donation Post
exports.approveDonation = async (req, res) => {
	const { id } = req.params
	try {
		const donation = await Donation.findById(id)
		if (donation.status === 'approved') {
			res.status(401).send({ message: 'Donation already approved' })
		} else {
			donation.status = 'approved'
			await donation.save()
			res.status(200).send({ message: 'Donation approved' })
		}
	} catch (error) {
		res.status(401).send({ message: 'Error approving donation' })
	}
}

// Get att request post by status
exports.getAllRequestsByStatus = async (req, res) => {
	const { status } = req.params
	try {
		const requests =
			status === 'all'
				? await Request.find()
				: await Request.find({ status })

		res.status(200).send({
			message: 'Request Posts of status: ' + status,
			body: requests,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting requests' })
	}
}

// Get numbers
exports.getNumbers = async (req, res) => {
	try {
		// Get number of total users
		const totalUsers = await User.countDocuments()
		// Get number of users verified
		const verifiedUsers = await User.countDocuments({ isVerified: true })
		// Get number of users not verified
		const notVerifiedUsers = await User.countDocuments({
			isVerified: false,
		})

		// Get number of volunteers
		const volunteers = await User.countDocuments({ isVolunteer: true })
		// Get number of volunteer applications
		const volunteerApplications =
			await VolunteerApplication.countDocuments()

		// Get number of donations
		const donations = await Donation.countDocuments()
		// Get number of donations pending
		const donationsPending = await Donation.countDocuments({
			status: 'pending',
		})
		// Get number of donations approved
		const donationsApproved = await Donation.countDocuments({
			status: 'approved',
		})
		// Get number of donations rejected
		const donationsRejected = await Donation.countDocuments({
			status: 'rejected',
		})

		// Get number of requests
		const requests = await Request.countDocuments()
		// Get number of requests pending
		const requestsPending = await Request.countDocuments({
			status: 'pending',
		})
		// Get number of requests approved
		const requestsApproved = await Request.countDocuments({
			status: 'approved',
		})
		// Get number of requests rejected
		const requestsRejected = await Request.countDocuments({
			status: 'rejected',
		})

		res.status(200).send({
			message: 'Numbers',
			body: {
				users: {
					total: totalUsers,
					verified: verifiedUsers,
					notVerified: notVerifiedUsers,
				},
				volunteers: {
					total: volunteers,
					applications: volunteerApplications,
				},
				donations: {
					total: donations,
					pending: donationsPending,
					approved: donationsApproved,
					rejected: donationsRejected,
				},
				requests: {
					total: requests,
					pending: requestsPending,
					approved: requestsApproved,
					rejected: requestsRejected,
				},
			},
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting numbers' })
	}
}
