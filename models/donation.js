const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donationSchema = new Schema(
	{
		donor_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		donor_name: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: ['Food', 'Clothes', 'Book', 'Toys'],
			required: true,
		},
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
			// enum: ['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara', 'Bhavnagar'],
		},
		pickupDate: {
			type: Date,
			required: true,
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
