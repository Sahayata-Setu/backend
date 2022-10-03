let bcrypt = require('bcrypt')
const { deleteFile } = require('../utils')

const User = require('../models/user')
const Donation = require('../models/donation')
const Request = require('../models/request')
const { uploadFile } = require('../s3')

// const User -
const upload = require('../utils')

const mongoose = require('mongoose')
// const user = require("../models/user");
// const { response } = require('express');

// Create new donation
exports.createDonation = async (req, res) => {
	const {
		donor_id,
		categories,
		description,
		quantity,
		pickupDetails,
		city,
		images,
	} = req.body
	try {
		const newDonation = await Donation.create({
			donor_id,
			categories,
			description,
			quantity,
			pickupDetails,
			city,
			images,
		})
		res.status(201).send({ status: res.statusCode, body: newDonation })
	} catch (error) {
		res.status(401).send({ message: 'Error creating donation' })
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
		categories,
		description,
		quantity,
		pickupDetails,
		city,
		images,
	} = req.body
	try {
		const newRequest = await Request.create({
			beneficiary_id,
			categories,
			description,
			quantity,
			pickupDetails,
			city,
			images,
		})
		res.status(201).send({
			status: res.statusCode,
			message: 'Request Post Created!',
			body: newRequest,
		})
	} catch (error) {
		console.log(error)
		res.status(401).send({ message: 'Error creating request', body: error })
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
