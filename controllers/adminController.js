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
		res.status(401).send({ message: 'Error getting donations', error })
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
			// Set status to approved
			donation.status = 'approved'
			// Increase the points of user's account
			const user = await User.findById(donation.donor_id)
			user.points += 10 * donation.quantity
			await user.save()
			await donation.save()
			notifyUsers(
				'Donation Approved',
				`Your donation of ${donation.title} has been approved.`,
				donation.donor_id.toString()
			)
			res.status(200).send({ message: 'Donation approved' })
		}
	} catch (error) {
		res.status(401).send({ message: 'Error approving donation', error })
	}
}

// Reject Donation Post
exports.rejectDonation = async (req, res) => {
	const { id } = req.params
	try {
		const donation = await Donation.findById(id)
		if (donation.status === 'rejected') {
			res.status(401).send({ message: 'Donation already rejected' })
		} else {
			donation.status = 'rejected'
			await donation.save()
			res.status(200).send({ message: 'Donation rejected' })
		}
	} catch (error) {
		res.status(401).send({ message: 'Error rejecting donation', error })
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
		res.status(401).send({ message: 'Error getting numbers', error })
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
		res.status(401).send({ message: 'Error getting requests', error })
	}
}

// Approve Request Post
exports.approveRequest = async (req, res) => {
	const { id } = req.params
	try {
		const request = await Request.findById(id)
		if (request.status === 'approved') {
			res.status(401).send({ message: 'Request already approved' })
		} else {
			request.status = 'approved'
			await request.save()
			res.status(200).send({ message: 'Request approved' })
		}
	} catch (error) {
		res.status(401).send({ message: 'Error approving request', error })
	}
}

// Reject Request Post
exports.rejectRequest = async (req, res) => {
	const { id } = req.params
	try {
		const request = await Request.findById(id)
		if (request.status === 'rejected') {
			res.status(401).send({ message: 'Request already rejected' })
		} else {
			request.status = 'rejected'
			await request.save()
			res.status(200).send({ message: 'Request rejected' })
		}
	} catch (error) {
		res.status(401).send({ message: 'Error rejecting request', error })
	}
}

// View pending volunteer requests
exports.getPendingVolunteerRequests = async (req, res) => {
	try {
		const volunteerApplications = await VolunteerApplication.find({
			status: 'pending',
		})
		res.status(200).send({
			message: 'Pending Volunteer Requests',
			body: volunteerApplications,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Error getting pending volunteer requests',
			error,
		})
	}
}

// Approve volunteer request
exports.approveVolunteerRequest = async (req, res) => {
	const { id } = req.params
	try {
		const volunteerApplication = await VolunteerApplication.findById(id)
		if (volunteerApplication.status === 'approved') {
			res.status(401).send({
				message: 'Volunteer request already approved',
			})
		} else {
			// Update volunteer status is user collection
			const user = await User.findById(volunteerApplication.applicant_id)
			user.isVolunteer = true
			await user.save()

			// Update volunteer application status
			volunteerApplication.status = 'approved'
			await volunteerApplication.save()

			res.status(200).send({ message: 'Volunteer request approved' })
		}
	} catch (error) {
		res.status(401).send({
			message: 'Error approving volunteer request',
			error,
		})
	}
}

// Reject volunteer request
exports.rejectVolunteerRequest = async (req, res) => {
	const { id } = req.params
	try {
		const volunteerApplication = await VolunteerApplication.findById(id)
		if (volunteerApplication.status === 'rejected') {
			res.status(401).send({
				message: 'Volunteer request already rejected',
			})
		} else {
			// Update volunteer status in user collection
			const user = await User.findById(volunteerApplication.applicant_id)
			user.isVolunteer = false
			await user.save()

			// Update volunteer application status
			volunteerApplication.status = 'rejected'
			await volunteerApplication.save()
			res.status(200).send({ message: 'Volunteer request rejected' })
		}
	} catch (error) {
		res.status(401).send({
			message: 'Error rejecting volunteer request',
			error,
		})
	}
}

// View volunteer profile from request
exports.getVolunteerApplication = async (req, res) => {
	const { id } = req.params
	try {
		const volunteerApplication = await VolunteerApplication.findById(id)
		let user = await User.findById(volunteerApplication.applicant_id)
		// Remove password from user object
		user.password = undefined
		res.status(200).send({
			message: 'Volunteer Profile',
			body: { application: volunteerApplication, user },
		})
	} catch (error) {
		res.status(401).send({
			message: 'Error getting volunteer profile',
			error,
		})
	}
}

exports.getAllVolunteers = async (req, res) => {
	try {
		const volunteers = await User.find({ isVolunteer: true })
		res.status(200).send({
			message: 'All Volunteers',
			body: volunteers,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Error getting volunteers',
			error,
		})
	}
}

exports.promoteToAdmin = async (req, res) => {
	const { id } = req.params
	// Check if current user is admin
	if (req.user.role === 'admin') {
		try {
			const user = await User.findById(id)
			user.role = 'admin'
			await user.save()
			res.status(200).send({
				message: 'User promoted to admin',
			})
		} catch (error) {
			res.status(401).send({
				message: 'Error promoting user to admin',
				error,
			})
		}
	} else {
		res.status(401).send({
			message: 'You are not authorized to promote a user to admin',
		})
	}
}

// Search donations
exports.searchDonations = async (req, res) => {
	const { query } = req.params

	try {
		const donations = await Donation.find({
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ description: { $regex: query, $options: 'i' } },
			],
		})
		res.status(200).send({
			message: 'Donations',
			body: donations,
			count: donations.length,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Error getting donations',
			error,
		})
	}
}

// Search requests
exports.searchRequests = async (req, res) => {
	const { query } = req.params
	try {
		const requests = await Request.find({
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ description: { $regex: query, $options: 'i' } },
			],
		})
		res.status(200).send({
			message: 'Requests',
			body: requests,
			count: requests.length,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Error getting requests',
			error,
		})
	}
}

// Search volunteers
exports.searchVolunteers = async (req, res) => {
	const { query } = req.params
	try {
		const volunteers = await User.find({
			$or: [
				{ firstName: { $regex: query, $options: 'i' } },
				{ lastName: { $regex: query, $options: 'i' } },
				{ email: { $regex: query, $options: 'i' } },
			],
			isVolunteer: true,
		})
		res.status(200).send({
			message: 'Volunteers',
			body: volunteers,
			count: volunteers.length,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Error getting volunteers',
			error,
		})
	}
}

// Search users
exports.searchUsers = async (req, res) => {
	const { query } = req.params
	try {
		const users = await User.find({
			$or: [
				{ firstName: { $regex: query, $options: 'i' } },
				{ lastName: { $regex: query, $options: 'i' } },
				{ email: { $regex: query, $options: 'i' } },
			],
		})
		res.status(200).send({
			message: 'Users',
			body: users,
			count: users.length,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Error getting users',
			error,
		})
	}
}
