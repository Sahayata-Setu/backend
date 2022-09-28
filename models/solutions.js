const mongoose = require('mongoose')
const Schema = mongoose.Schema

const solutionSchema = new Schema(
	{
		userId: {
			ref: 'User',
			type: Schema.Types.ObjectId,
		},
		images: [
			{
				type: String,
				// required: true
			},
		],
		description: {
			type: String,
			required: true,
		},
		postId: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
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
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Solutions', solutionSchema)
