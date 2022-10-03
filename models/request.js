const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema(
	{
		beneficiary_id: {
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
		donatedBy: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Request', requestSchema)
