const bcrypt = require('bcrypt')

const User = require('../models/user')
const Donation = require('../models/donation')
const Request = require('../models/request')
const Campaign = require('../models/campaign')

const { downloadFile } = require('../utils')
const campaign = require('../models/campaign')
// Create new donation
exports.createDonation = async (req, res) => {
	// console.log(req.user)
	const {
		title,
		category,
		description,
		quantity,
		pickupDate,
		pickupDetails,
	} = req.body
	// console.log(req.user);
	try {
		const newDonation = await Donation.create({
			donor_id: req.user.id,
			donor_name: req.user.firstName + ' ' + req.user.lastName,
			city: req.user.city,
			title,
			category,
			description,
			quantity,
			pickupDate,
			pickupDetails,
			images: req.files.map((file) => file.location),
		})
		res.status(201).send({
			message: 'New donation post created',
			body: newDonation,
		})
	} catch (error) {
		// console.log(error);
		res.status(401).send({ message: 'Error creating donation', error })
	}
}

// Update Donation Post
exports.updateDonation = async (req, res) => {
	const { id } = req.params
	const { categories, description, quantity, pickupDetails, city, images } =
		req.body
	try {
		const donation = await Donation.findByIdAndUpdate(
			id,
			{
				categories,
				description,
				quantity,
				pickupDetails,
				city,
				images,
			},
			{ new: true }
		)
		res.status(201).send({
			status: res.statusCode,
			message: 'Donation Post Updated!',
			body: donation,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error editing donation' })
	}
}

// Get All Donation Post
exports.getAllDonations = async (req, res) => {
	try {
		const donations = await Donation.find().sort({
			createdAt: -1,
		})
		res.status(200).send({ status: res.statusCode, body: donations })
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations' })
	}
}

// Get Single Donation Post
exports.getSingleDonation = async (req, res) => {
	const { id } = req.params
	try {
		const donation = await Donation.findById(id)
		res.status(200).send({ status: res.statusCode, body: donation })
	} catch (error) {
		res.status(401).send({ message: 'Error getting donation' })
	}
}

// Delete Donation Post
exports.deleteDonation = async (req, res) => {
	const { id } = req.params
	try {
		await Donation.findByIdAndDelete(id)
		res.status(200).send({
			status: res.statusCode,
			message: 'Document deleted successfully',
		})
	} catch (error) {
		res.status(401).send({ message: 'Error deleting donation' })
	}
}

// Create Request Post
exports.createRequest = async (req, res) => {
	// console.log(req.files)
	const {
		title,
		category,
		description,
		quantity,
		pickupDate,
		pickupDetails,
	} = req.body
	try {
		const newRequest = await Request.create({
			beneficiary_id: req.user.id,
			beneficiary_name: req.user.firstName + ' ' + req.user.lastName,
			title,
			category,
			description,
			quantity,
			pickupDate,
			pickupDetails,
			city: req.user.city,
			images: req.files.map((file) => file.location),
		})
		res.status(201).send({
			message: 'Request Post Created!',
			body: newRequest,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error creating request', error })
	}
}

// Update Request Post
exports.updateRequest = async (req, res) => {
	const { id } = req.params
	const { categories, description, quantity, pickupDetails, city, images } =
		req.body
	try {
		const request = await Request.findByIdAndUpdate(
			id,
			{
				categories,
				description,
				quantity,
				pickupDetails,
				city,
				images,
			},
			{ new: true }
		)
		res.status(201).send({
			status: res.statusCode,
			message: 'Request Post Updated!',
			body: request,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error editing request' })
	}
}

// All donations by a user
exports.getDonationsByUser = async (req, res) => {
	const { id } = req.params
	try {
		const donations = await Donation.find({ donor_id: id })
		res.status(200).send({ status: res.statusCode, body: donations })
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations' })
	}
}

// Get All Request Post
exports.getRequestsByCategory = async (req, res) => {
	if (req.params.category == 'all') {
		try {
			const requests = await Request.find().sort({
				createdAt: -1,
			})
			res.status(200).send({ status: res.statusCode, body: requests })
		} catch (error) {
			res.status(401).send({ message: 'Error getting requests' })
		}
	} else {
		try {
			const requests = await Request.find({
				category: req.params.category,
			}).sort({
				createdAt: -1,
			})
			res.status(200).send({ status: res.statusCode, body: requests })
		} catch (error) {
			res.status(401).send({ message: 'Error getting requests' })
		}
	}
}

// Get Single Request Post
exports.getSingleRequest = async (req, res) => {
	const { id } = req.params
	try {
		const request = await Request.findById(id)
		res.status(200).send({ status: res.statusCode, body: request })
	} catch (error) {
		res.status(401).send({ message: 'Error getting request' })
	}
}

// Delete Request Post
exports.deleteRequest = async (req, res) => {
	const { id } = req.params
	try {
		await Request.findByIdAndDelete(id)
		res.status(200).send({
			status: res.statusCode,
			message: 'Document deleted successfully',
		})
	} catch (error) {
		res.status(401).send({ message: 'Error deleting request' })
	}
}

// Get All Request Post by a user
exports.getRequestsByUser = async (req, res) => {
	const { id } = req.params
	try {
		const requests = await Request.find({ beneficiary_id: id })
		res.status(200).send({ status: res.statusCode, body: requests })
	} catch (error) {
		res.status(401).send({ message: 'Error getting requests' })
	}
}

// Get all donations by a city
exports.getDonationsByCity = async (req, res) => {
	const { city } = req.params
	try {
		const donations = await Donation.find({ city })
		res.status(200).send({ status: res.statusCode, body: donations })
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations' })
	}
}

// Get all requests by a city
exports.getRequestsByCity = async (req, res) => {
	const { city } = req.params
	try {
		const requests = await Request.find({ city })
		res.status(200).send({ status: res.statusCode, body: requests })
	} catch (error) {
		res.status(401).send({ message: 'Error getting requests' })
	}
}

// Get user profile
exports.getUserProfile = async (req, res) => {
	const { id } = req.params
	// console.log(id)
	try {
		let user = await User.findById(id)
		// Remove password from user object
		user.password = undefined
		res.status(200).send({ body: user })
	} catch (error) {
		res.status(401).send({ message: 'Error getting user' })
	}
}

// Update profile
exports.updateUserProfile = async (req, res) => {
	const { id } = req.params
	const { firstName, lastName, email, phoneNo } = req.body
	console.log(req.body.firstName)
	try {
		let user = await User.findByIdAndUpdate(
			id,
			{
				firstName,
				lastName,
				email,
				phoneNo,
			},
			{ new: true }
		)
		// Remove password from user object
		user.password = undefined

		res.status(201).send({
			message: 'Profile Updated!',
			body: user,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error editing profile' })
	}
}

// Update user city
exports.updateUserCity = async (req, res) => {
	const { id } = req.params
	const { city } = req.body
	try {
		let user = await User.findByIdAndUpdate(
			id,
			{
				city,
			},
			{ new: true }
		)
		// Remove password from user object
		user.password = undefined

		res.status(201).send({
			message: 'City Updated!',
			body: user,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error editing city' })
	}
}

// Update password
exports.updateUserPassword = async (req, res) => {
	const { id } = req.params
	const { old_password, new_password } = req.body
	// Find user by id
	try {
		let user = await User.findById(id)
		// Check if old password is correct
		const isMatch = await bcrypt.compare(old_password, user.password)
		if (!isMatch) {
			return res
				.status(401)
				.send({ message: 'Old password is incorrect' })
		}
		// Hash new password
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(new_password, salt)

		// Update password
		user = await User.findByIdAndUpdate(
			id,
			{
				password: hashedPassword,
			},
			{ new: true }
		)
		// Remove password from user object
		user.password = undefined

		res.status(201).send({
			message: 'Password Updated!',
		})
	} catch (error) {
		res.status(401).send({ message: 'Error editing password' })
	}
}

// Get donation by status
exports.getDonationsByStatus = async (req, res) => {
	const { status } = req.params
	try {
		const donations = await Donation.find({ status })
		res.status(200).send({
			message: 'Donations with status: ' + status,
			body: donations,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations', error })
	}
}

// Is eligable for certificate
exports.isEligableForCertificate = async (req, res) => {
	const { id } = req.user
	try {
		// Check if user has 50 points
		const user = await User.findById(id)
		if (user.points < 50) {
			return res.status(401).send({
				message: 'User is not eligable for certificate',
				body: {
					eligable: false,
				},
			})
		} else {
			return res.status(200).send({
				message: 'User is eligable for certificate',
				body: {
					eligable: true,
				},
			})
		}
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations', error })
	}
}

// Generate certificate
exports.generateCertificate = async (req, res) => {
	const { id } = req.user
	try {
		// Check if user has 50 points
		const user = await User.findById(id)
		if (user.points < 50) {
			return res.status(401).send({
				message: 'User is not eligable for certificate',
				body: {
					eligable: false,
				},
			})
		} else {
			// Insert today's date into certificate array
			user.certificates.push(new Date())
			// Subtract 50 points from points
			user.points -= 50
			// Save user
			await user.save()
			return res.status(200).send({
				message: 'Certificate generated',
			})
		}
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations', error })
	}
}

exports.exploreDonations = async (req, res) => {
	try {
		// Get all approved donations and sort by time
		const donations = await Donation.find({ status: 'approved' }).sort({
			createdAt: -1,
		})
		// sort donations by date
		res.status(200).send({
			message: 'All approved donations',
			body: donations,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations', error })
	}
}

exports.exploreRequests = async (req, res) => {
	try {
		// Get all approved donations and sort by time
		const requests = await Request.find({ status: 'approved' }).sort({
			createdAt: -1,
		})
		// sort donations by date
		res.status(200).send({
			message: 'All approved requests',
			body: requests,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting requests', error })
	}
}

// Explore Campaigns
exports.exploreCampaigns = async (req, res) => {
	try {
		// Get all approved donations and sort by time
		const campaign = await Campaign.find({ status: 'approved' }).sort({
			createdAt: -1,
		})
		// sort donations by date
		res.status(200).send({
			message: 'All approved campaigns',
			body: campaign,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting campaigns', error })
	}
}

// Get requests by category
exports.exploreRequestsByCategory = async (req, res) => {
	const { category } = req.params
	try {
		// Get all approved donations and sort by time
		const requests = await Request.find({
			status: 'approved',
			category,
		}).sort({
			createdAt: -1,
		})
		// Get number of approved requests in category
		const count = await Request.countDocuments({
			status: 'approved',
			category,
		})
		res.status(200).send({
			message: 'All approved requests of category ' + category,
			body: { count, requests },
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting requests', error })
	}
}

exports.getDonationsByCategory = async (req, res) => {
	const { category } = req.params
	try {
		// Get all approved donations and sort by time
		const donations = await Donation.find({
			category,
		}).sort({
			createdAt: -1,
		})
		res.status(200).send({
			message: 'All approved donations of category ' + category,
			body: donations,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations', error })
	}
}
