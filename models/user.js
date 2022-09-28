const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
		points: {
			type: Number,
		},
		role: {
			type: String,
			required: true,
		},
		resetPasswordToken: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
