const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donationSchema = new Schema(
	{
		donor_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		categories: [
			{
				type: String,
				enum: ['food', 'cloths', 'book', 'other'],
				required: true,
			},
		],
		description: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		city: {
			type: String,
			required: true,
			enum: ['rajkot', 'ahmedabad', 'surat', 'vadodara', 'bhavnagar'],
		},
		pickupDetails: {
			type: String,
			required: true,
		},
		images: [
			{
				type: String,
			},
		],
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected', 'donated'],
			default: 'pending',
		},
		donatedTo: [
			{
				type: Schema.Types.ObjectId,
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Donation', donationSchema)
