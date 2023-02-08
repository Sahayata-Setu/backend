const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
			required: true,
		},
		message: {
			type: String,
		},
		link: {
			type: String,
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Notification', notificationSchema)
