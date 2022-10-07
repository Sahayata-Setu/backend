const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		role: {
			type: String,
			enum: ['admin', 'user', 'volunteer'],
			required: true,
			default: 'user',
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		city: {
			type: String,
			enum: ['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara', 'Bhavnagar'],
		},
		points: {
			type: Number,
			default: 0,
		},
		language: {
			type: String,
			enum: ['english', 'hindi', 'gujarati'],
			default: 'english',
			required: true,
		},
		phoneNo: {
			type: String,
		},
		address: {
			type: String, // TODO: change to address type
		},
		profilePic: {
			type: String,
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'other'],
			required: true,
		},
		certificates: [
			{
				type: Date,
			},
		],
		isVolunteer: {
			type: Boolean,
			required: true,
			default: false,
		},
		isBlocked: {
			type: Boolean,
			required: true,
			default: false,
		},
		isVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
		password: {
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
