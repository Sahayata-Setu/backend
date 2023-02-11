const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donationLocationSchema = new Schema(
	{
		city: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		address: {
			type: String,
		},
		landmark: {
			type: String,
		},
		contact: {
			type: String,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('DonationLocation', donationLocationSchema)
