const bcrypt = require('bcrypt')

const User = require('../models/user')
const Donation = require('../models/donation')
const Request = require('../models/request')
const Campaign = require('../models/campaign')
const DonationLocation = require('../models/donationLocation')

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
	// get users city
	const { id } = req.user
	const user = await User.findById(id)
	const { city } = user

	try {
		const donations = await Donation.find({ city }).sort({
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
	// get users city
	const { id } = req.user
	const user = await User.findById(id)
	const { city } = user

	if (req.params.category == 'all') {
		try {
			const requests = await Request.find({ city }).sort({
				createdAt: -1,
			})
			res.status(200).send({ status: res.statusCode, body: requests })
		} catch (error) {
			res.status(401).send({ message: 'Error getting requests' })
		}
	} else {
		try {
			const requests = await Request.find({
				city,
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
	// console.log(req.body.firstName)
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
	const { id } = req.user

	try {
		// check if user is general user or ngo
		const user = await User.findById(id)

		let donations
		if (user.role === 'user' || user.role === 'volunteer') {
			donations = await Donation.find({
				status,
				quantity: { $lt: 5 },
			}).sort({
				created_at: 1,
			})
		} else if (user.role === 'ngo') {
			donations = await Donation.find({
				status,
				quantity: { $lt: 5 },
			}).sort({
				created_at: 1,
			})
		} else if (user.role === 'admin') {
			donations = await Donation.find({
				status,
			}).sort({
				created_at: 1,
			})
		}

		res.status(200).send({
			message: 'Donations with status: ' + status,
			body: donations,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations', error })
	}
}

// Is eligable for certificate
// exports.isEligableForCertificate = async (req, res) => {
// 	const { id } = req.user
// 	try {
// 		// Check if user has 50 points
// 		const user = await User.findById(id)
// 		if (user.points < 50) {
// 			return res.status(401).send({
// 				message: 'User is not eligable for certificate',
// 				body: {
// 					eligable: false,
// 				},
// 			})
// 		} else {
// 			return res.status(200).send({
// 				message: 'User is eligable for certificate',
// 				body: {
// 					eligable: true,
// 				},
// 			})
// 		}
// 	} catch (error) {
// 		res.status(401).send({ message: 'Error getting donations', error })
// 	}
// }

// Generate certificate
// exports.generateCertificate = async (req, res) => {
// 	const { id } = req.user
// 	try {
// 		// Check if user has 50 points
// 		const user = await User.findById(id)
// 		if (user.points < 50) {
// 			return res.status(401).send({
// 				message: 'User is not eligable for certificate',
// 				body: {
// 					eligable: false,
// 				},
// 			})
// 		} else {
// 			// Insert today's date into certificate array
// 			user.certificates.push(new Date())
// 			// Subtract 50 points from points
// 			user.points -= 50
// 			// Save user
// 			await user.save()
// 			return res.status(200).send({
// 				message: 'Certificate generated',
// 			})
// 		}
// 	} catch (error) {
// 		res.status(401).send({ message: 'Error getting donations', error })
// 	}
// }

exports.exploreDonations = async (req, res) => {
	try {
		// get user id from token
		const { id } = req.user

		// get user object
		const user = await User.findById(id)

		let donations

		if (user.role === 'user' || user.role === 'volunteer') {
			donations = await Donation.find({
				city: user.city,
				status: 'approved',
				quantity: { $lt: 5 },
			}).sort({
				createdAt: -1,
			})
		} else if (user.role === 'ngo') {
			donations = await Donation.find({
				city: user.city,
				status: 'approved',
				quantity: { $gte: 5 },
			}).sort({
				createdAt: -1,
			})
		} else if (user.role === 'admin') {
			donations = await Donation.find({
				city: user.city,
				status: 'approved',
			}).sort({
				createdAt: -1,
			})
		}
		// Get all approved donations and sort by time
		// sort donations by date
		res.status(200).send({
			message: 'All approved donations',
			body: donations,
			count: donations.length,
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
	// get users city
	const { id } = req.user
	const user = await User.findById(id)
	const { city } = user

	const { category } = req.params
	try {
		// Get all approved donations and sort by time
		const requests = await Request.find({
			status: 'approved',
			category,
			city,
		}).sort({
			createdAt: -1,
		})
		// Get number of approved requests in category
		const count = await Request.countDocuments({
			status: 'approved',
			category,
			city,
		})
		res.status(200).send({
			message: 'All approved requests of category ' + category,
			body: { count, requests },
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting requests', error })
	}
}

// Get approved donations by category
exports.exploreDonationsByCategory = async (req, res) => {
	// get users city
	const { id } = req.user
	const user = await User.findById(id)
	const { city } = user

	const { category } = req.params
	try {
		// Get all approved donations and sort by time
		const donations = await Donation.find({
			status: 'approved',
			category,
			city,
		}).sort({
			createdAt: -1,
		})
		// Get number of approved donations in category
		const count = await Donation.countDocuments({
			status: 'approved',
			category,
			city,
		})
		res.status(200).send({
			message: 'All approved donations of category ' + category,
			body: { count, donations },
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting requests', error })
	}
}

exports.getDonationsByCategory = async (req, res) => {
	// get users city
	const { id } = req.user
	const user = await User.findById(id)
	const { city } = user

	const { category } = req.params
	console.log({ city, category })
	try {
		// Get all approved donations and sort by time
		const donations = await Donation.find({
			category,
			city,
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

exports.getSingleCampaigns = (req, res) => {
	const { id } = req.params
	Campaign.findById(id)
		.then((campaign) => {
			res.status(200).send({
				message: 'Campaign found',
				body: campaign,
			})
		})
		.catch((err) => {
			res.status(401).send({
				message: 'Error getting campaign',
				error: err,
			})
		})
}

// Search donations
exports.searchDonations = async (req, res) => {
	// get users city
	const { id } = req.user
	const user = await User.findById(id)
	const { city } = user

	const { query } = req.params
	try {
		// search all approved donations and sort by time
		const donations = await Donation.find({
			status: 'approved',
			city,
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ description: { $regex: query, $options: 'i' } },
			],
		}).sort({
			createdAt: -1,
		})

		res.status(200).send({
			message: 'All approved donations for query: ' + query,
			body: donations,
			count: donations.length,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting data', error })
	}
}

// Search requests
exports.searchRequests = async (req, res) => {
	// get users city
	const { id } = req.user
	const user = await User.findById(id)
	const { city } = user

	const { query } = req.params
	try {
		// search all approved requests and sort by time
		const requests = await Request.find({
			status: 'approved',
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ description: { $regex: query, $options: 'i' } },
			],
		}).sort({
			createdAt: -1,
		})

		res.status(200).send({
			message: 'All approved requests for query: ' + query,
			body: requests,
			count: requests.length,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting data', error })
	}
}

// Search campaigns
exports.searchCampaigns = async (req, res) => {
	// get users city
	const { id } = req.user
	const user = await User.findById(id)
	const { city } = user

	const { query } = req.params
	try {
		// search all approved requests and sort by time
		const campaigns = await Campaign.find({
			status: 'approved',
			city,
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ description: { $regex: query, $options: 'i' } },
			],
		}).sort({
			createdAt: -1,
		})

		res.status(200).send({
			message: 'All approved campaigns for query: ' + query,
			body: campaigns,
			count: campaigns.length,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting data', error })
	}
}

// Combined search (donations, requests, campaigns)
exports.search = async (req, res) => {
	// get users city
	const { id } = req.user
	const user = await User.findById(id)
	const { city } = user

	const { query } = req.params
	try {
		// search all approved requests and sort by time
		const donations = await Donation.find({
			status: 'approved',
			city,
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ description: { $regex: query, $options: 'i' } },
			],
		}).sort({
			createdAt: -1,
		})

		const requests = await Request.find({
			status: 'approved',
			city,
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ description: { $regex: query, $options: 'i' } },
			],
		}).sort({
			createdAt: -1,
		})

		const campaigns = await Campaign.find({
			status: 'approved',
			city,
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ description: { $regex: query, $options: 'i' } },
			],
		}).sort({
			createdAt: -1,
		})

		res.status(200).send({
			message: 'All approved data for query: ' + query,
			body: {
				all: {
					data: [...donations, ...requests, ...campaigns],
					count:
						donations.length + requests.length + campaigns.length,
				},
				donations: {
					data: donations,
					count: donations.length,
				},
				requests: {
					data: requests,
					count: requests.length,
				},
				campaigns: {
					data: campaigns,
					count: campaigns.length,
				},
			},
			count: donations.length + requests.length + campaigns.length,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error getting data', error })
	}
}

// create donation location
exports.createDonationLocation = async (req, res) => {
	const { city, title, address, landmark, contact } = req.body
	console.log(req.body)
	try {
		const donationLocation = await DonationLocation.create({
			city,
			title,
			address,
			landmark,
			contact,
		})
		res.status(200).send({
			message: 'Donation location created',
			body: donationLocation,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Error creating donation location',
			error,
		})
	}
}

// get donation locations
exports.getAllDonationLocation = async (req, res) => {
	try {
		//get users city
		const { id } = req.user
		const user = await User.findById(id)
		const { city } = user

		const locations = await DonationLocation.find({ city })

		res.status(200).send({
			message: 'All nearby locations',
			body: locations,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Unable to get locations',
		})
	}
}

// get single donation location
exports.getSingleDonationLocation = async (req, res) => {
	const { locationId } = req.params

	try {
		const location = await DonationLocation.findById(locationId)

		res.status(200).send({
			message: 'Single location',
			body: location,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Unable to get location',
		})
	}
}

// get point count by user id
exports.getPointCount = async (req, res) => {
	const { userId } = req.params

	try {
		//  get single user
		const user = await User.findById(userId)

		res.status(200).send({
			message: 'Points of user',
			body: user.points,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Unable to get points',
			error,
		})
	}
}

// credit point
exports.creditPoint = async (req, res) => {
	const { userId } = req.params

	console.log({ userId })

	try {
		const user = await User.findById(userId)

		console.log({ user })

		user.points += 5

		await user.save()

		res.status(200).send({
			message: 'Points credited',
			body: user,
		})
	} catch (error) {
		res.status(401).send({
			message: 'Unable to credit points',
			error,
		})
	}
}
