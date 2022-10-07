const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema(
	{
		beneficiary_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		beneficiary_name: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: ['Food', 'Clothes', 'Book', 'Other'],
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
			enum: ['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara', 'Bhavnagar'],
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
		donatedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Request', requestSchema)
