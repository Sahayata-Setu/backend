const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		images: [
			{
				type: String,
			},
		],
		description: {
			type: String,
			required: true,
		},
		// postedBy: {
		//     type: String,
		//     required: true,
		// },
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		userName: {
			type: String,
			required: true,
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comments',
			},
		],
		solutions: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Solutions',
			},
		],
		upVotes: {
			type: Number,
		},
		downVotes: {
			type: Number,
		},
		upVoters: [
			{
				type: Schema.Types.ObjectId,
			},
		],
		downVoters: [
			{
				type: Schema.Types.ObjectId,
			},
		],
		status: {
			type: String,
			required: true,
		},
		points: {
			type: Number,
		},
		pointsRedeemed: {
			type: Boolean,
			default: false,
		},
		acceptedSolution: {
			type: Schema.Types.ObjectId,
		},
		tags: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
