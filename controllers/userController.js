const bcrypt = require('bcrypt')

const User = require('../models/user')
const Donation = require('../models/donation')
const Request = require('../models/request')

const { downloadFile } = require('../utils')
// Create new donation
exports.createDonation = async (req, res) => {
	const {
		donor_id,
		donor_name,
		category,
		description,
		quantity,
		pickupDetails,
		city,
	} = req.body

	try {
		const newDonation = await Donation.create({
			donor_id,
			donor_name,
			category,
			description,
			quantity,
			pickupDetails,
			city,
			images: req.files.map((file) => file.key),
		})
		res.status(201).send({
			message: 'New donation post created',
			body: newDonation,
		})
	} catch (error) {
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
		const donations = await Donation.find()
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
	const {
		beneficiary_id,
		benificiary_name,
		category,
		description,
		quantity,
		pickupDetails,
		city,
	} = req.body
	try {
		const newRequest = await Request.create({
			beneficiary_id,
			benificiary_name,
			category,
			description,
			quantity,
			pickupDetails,
			city,
			images: req.files.map((file) => file.key),
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
exports.getAllRequests = async (req, res) => {
	try {
		const requests = await Request.find()
		res.status(200).send({ status: res.statusCode, body: requests })
	} catch (error) {
		res.status(401).send({ message: 'Error getting requests' })
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
	console.log(id)
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
	const { firstName, lastName, email, phone } = req.body
	try {
		let user = await User.findByIdAndUpdate(
			id,
			{
				firstName,
				lastName,
				email,
				phone,
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

// download image
exports.downloadImage = async (req, res) => {
	const key = '1664969731785-Screenshot from 2022-10-03 23-27-59 (copy).png'
	const file = await downloadFile(key)

	// Get extention of file name
	const ext = key.split('.').pop()

	res.type(ext).status(200).send(file)
}
