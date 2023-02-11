const mongoose = require('mongoose')
const Schema = mongoose.Schema

const volunteerApplicationSchema = new Schema(
	{
		applicant_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: false,
		},
		images: [
			{
				type: String,
			},
		],
		reason: {
			type: String,
		},
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model(
	'VolunteerApplication',
	volunteerApplicationSchema
)
