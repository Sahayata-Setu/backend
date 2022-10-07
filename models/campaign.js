const mongoose = require('mongoose')
const Schema = mongoose.Schema

const campaignSchema = new Schema(
	{
		volunteer_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		volunteer_name: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		location: {
			type: String,
		},
		city: {
			type: String,
			required: true,
			enum: ['rajkot', 'ahmedabad', 'surat', 'vadodara', 'bhavnagar'],
		},
		eventTime: {
			type: Date,
			required: true,
		},
		startTime: {
			type: Date,
		},
		endTime: {
			type: Date,
		},
		description: {
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
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Campaign', campaignSchema)
