const mongoose = require('mongoose')
const Schema = mongoose.Schema

const needRequestSchema = new Schema(
	{
		donorId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		receiverId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		needPostId: {
			type: Schema.Types.ObjectId,
			ref: 'Donation',
			required: true,
		},

		donor_status: {
			type: String,
			required: true,
		},
		donor_name: {
			type: String,
			required: true,
		},
		reciever_name: {
			type: String,
			required: true,
		},
		reciever_status: {
			type: String,
			required: true,
		},
		needTitle: {
			type: String,
			required: true,
		}
	},
	{ timestamps: true }
)

module.exports = mongoose.model('NeedRequest', needRequestSchema)
