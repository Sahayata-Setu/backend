const Post = require('../models/posts')
const Solution = require('../models/solutions')
const User = require('../models/user')
const Comments = require('../models/comments')
const user = require('../models/user')

exports.getDashboardData = async (req, res) => {
	const posts = await Post.find()
	const users = await User.find()
	// const post
	const approvedPosts = await Post.find({ status: 'approved' })
	const pendingPosts = await Post.find({ status: 'pending' })
	const solutions = await Solution.find()
	const comments = await Comments.find()
	// const rewardPoints = await User.find()
	let newUsers = []

	// users.map((e) => {
	//     // newUsers.push(e)
	//     const point= e.points =+ e.points
	//     console.log(point);
	// })
	console.log('this is new', newUsers)
	res.status(200).send({
		data: {
			post: posts.length,
			user: users.length,
			approvedPost: approvedPosts.length,
			pendingPost: pendingPosts.length,
			solutions: solutions.length,
			comments: comments.length,
		},
	})
	// console.log(posts)
}
