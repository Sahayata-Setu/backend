let bcrypt = require('bcrypt')
const { deleteFile } = require('../utils')

const User = require('../models/user')
const Donation = require('../models/donation')
const { uploadFile } = require('../s3')

// const User -
const upload = require('../utils')

const mongoose = require('mongoose')
// const user = require("../models/user");
// const { response } = require('express');

// Create new donation
exports.createDonation = async (req, res) => {
	const {
		donor_id,
		categories,
		description,
		quantity,
		pickupDetails,
		images,
	} = req.body
	try {
		const newDonation = await Donation.create({
			donor_id,
			categories,
			description,
			quantity,
			pickupDetails,
			images,
		})
		res.status(201).send({ status: res.statusCode, body: newDonation })
	} catch (error) {
		res.status(401).send({ message: 'Error creating donation' })
	}
}

// Update Donation Post
exports.updateDonation = async (req, res) => {
	const { id } = req.params
	const { categories, description, quantity, pickupDetails, images } =
		req.body
	try {
		const donation = await Donation.findByIdAndUpdate(
			id,
			{
				categories,
				description,
				quantity,
				pickupDetails,
				images,
			},
			{ new: true }
		)
		res.status(201).send({
			status: res.statusCode,
			message: 'Donation Post Updated!',
			body: donation,
		})
	} catch (error) {
		res.status(401).send({ message: 'Error editing donation' })
	}
}

// Get All Donation Post
exports.getAllDonations = async (req, res) => {
	try {
		const donations = await Donation.find()
		res.status(200).send({ status: res.statusCode, body: donations })
	} catch (error) {
		res.status(401).send({ message: 'Error getting donations' })
	}
}

// Get Single Donation Post
exports.getSingleDonation = async (req, res) => {
	const { id } = req.params
	try {
		const donation = await Donation.findById(id)
		res.status(200).send({ status: res.statusCode, body: donation })
	} catch (error) {
		res.status(401).send({ message: 'Error getting donation' })
	}
}

// //Creates new post
// exports.createPost = async (req, res) => {
// 	const image = req.files
// 	const { title, description, tags, categories } = req.body
// 	// console.log(req.files);

// 	let images = []
// 	try {
// 		const user = await User.findById(req.user)
// 		// console.log(user)
// 		if (image) {
// 			for (i = 0; i <= req.files.length - 1; i++) {
// 				fileName = req.files[i].filename
// 				imgPath = 'uploads/' + fileName
// 				images.push(imgPath)
// 			}
// 		}
// 		if (req.user) {
// 			const post = await Post({
// 				title,
// 				description,
// 				images: images,
// 				userId: req.user,
// 				upVotes: 0,
// 				userName: user.userName,
// 				downVotes: 0,
// 				status: 'pending',
// 				tags: tags,
// 				categories: categories,
// 			})
// 			post.save()
// 				.then(async (result) => {
// 					await User.findByIdAndUpdate(req.user, {
// 						$push: { posts: result._id },
// 					})
// 					res.send({ data: result })
// 				})
// 				.catch((err) => {
// 					// console.log(err)
// 					res.status(401).send({
// 						message: 'Please enter all the required fields',
// 					})
// 				})
// 		}
// 	} catch (err) {
// 		// console.log(err);
// 		return res.status(400).send({ message: 'no data' })
// 	}
// }
// //Delete single post
// exports.postDeletePost = async (req, res) => {
// 	const postId = req.body.postId
// 	// console.log(postId);
// 	try {
// 		const post = await Post.findById(postId)
// 		// console.log(post.images.length);
// 		for (i = 0; i <= post.images.length - 1; i++) {
// 			deleteFile(post.images[i])
// 		}
// 	} catch (error) {
// 		// console.log(error);
// 		res.status(401).send({ message: 'Error deleting post' })
// 	}
// }
// //fetch single post
// exports.getEditPost = async (req, res) => {
// 	// const { title, description } = req.body;

// 	const postId = req.params.postId

// 	const posts = await Post.findById(postId)
// 	if (posts) {
// 		return res.status(200).send({ status: res.statusCode, data: posts })
// 	}
// 	return res.status(401).send({ message: 'No posts found' })
// }

// //Edit post
// exports.postEditPost = async (req, res) => {
// 	// const { title, description } = req.body;
// 	const postId = req.params.postId
// 	const updatedTitle = req.body.title
// 	const updatedDescription = req.body.description

// 	try {
// 		let posts = await Post.findByIdAndUpdate(postId)

// 		posts.title = updatedTitle
// 		posts.description = updatedDescription
// 		res.send({ message: 'success' })
// 	} catch (err) {
// 		console.log(err)
// 		res.send({ message: 'No posts found' })
// 	}
// }
// //Delete single post
// exports.postDeletePost = async (req, res) => {
// 	const postId = req.body.postId
// 	// console.log(postId);
// 	try {
// 		const post = await Post.findById(postId)
// 		// console.log(post.images.length);
// 		for (i = 0; i <= post.images.length - 1; i++) {
// 			deleteFile(post.images[i])
// 		}

// 		// deleteFile("uploads/1664009659993.png")

// 		post.deleteOne({ _id: postId })
// 		res.send({ message: 'success' })
// 	} catch (error) {
// 		// console.log(error)
// 		res.status(401).send({ message: 'Posts not found' })
// 	}
// }

// exports.postSolution = async (req, res) => {
// 	const { postId, description } = req.body
// 	// const {postId} = req.params;
// 	const userId = req.user
// 	// console.log(userId);

// 	// create new entry for solution in posts
// 	const solution = await Solution({
// 		userId: userId,
// 		description,
// 		postId,
// 		status: 'pending',
// 		upVotes: 0,
// 		downVotes: 0,
// 		upVoters: [],
// 		downVoters: [],
// 	})

// 	solution
// 		.save()
// 		.then((result) => {
// 			// add solution id to post
// 			Post.findByIdAndUpdate(postId, { $push: { solutions: result._id } })
// 				.then((result) => {
// 					res.send({
// 						status: res.statusCode,
// 						message: 'Solution Posted!',
// 					})
// 				})
// 				.catch((err) => {
// 					res.status(401).send({
// 						message: 'Error adding solution to post',
// 					})
// 				})
// 		})
// 		.catch((err) => {
// 			res.status(401).send({ message: 'Error posting solution' })
// 			// console.log(err)
// 		})
// }

// exports.postComment = async (req, res) => {
// 	const { postId, solutionId, description } = req.body
// 	// const {postId} = req.params;
// 	const userId = req.user

// 	// create new entry for solution in posts
// 	const comment = await Comment({
// 		userId,
// 		description,
// 		postId,
// 		solutionId,
// 	})

// 	comment
// 		.save()
// 		.then((result) => {
// 			// Check if comment is for a solution or post
// 			if (solutionId) {
// 				// add comment id to solution
// 				Solution.findByIdAndUpdate(solutionId, {
// 					$push: { comments: result._id },
// 				})
// 					.then((result) => {
// 						res.send({
// 							status: res.statusCode,
// 							message: 'Comment Posted!',
// 						})
// 					})
// 					.catch((err) => {
// 						res.status(401).send({
// 							message: 'Error adding comment to solution',
// 						})
// 					})
// 			} else if (postId) {
// 				// add comment id in post
// 				Post.findByIdAndUpdate(postId, {
// 					$push: { comments: result._id },
// 				})
// 					.then((result) => {
// 						res.send({
// 							status: res.statusCode,
// 							message: 'Comment Posted!',
// 						})
// 					})
// 					.catch((err) => {
// 						res.status(401).send({
// 							message: 'Error adding solution to post',
// 						})
// 					})
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(401).send({ message: 'Error posting comment' })
// 			// console.log(err)
// 		})
// }

// exports.upVote = async (req, res) => {
// 	const { postId } = req.body
// 	const userId = req.user

// 	const post = await Post.findById(postId)

// 	// check if user has already upvoted
// 	if (post.upVoters.includes(userId)) {
// 		res.send({
// 			status: res.statusCode,
// 			message: 'User has already upvoted this post',
// 		})
// 	} else {
// 		// check if user has already downvoted
// 		if (post.downVoters.includes(userId)) {
// 			// remove user from downvoters
// 			post.downVoters = post.downVoters.filter((user) => user != userId)

// 			// decrese downvotes by 1
// 			post.downVotes -= 1
// 		}
// 		// increase upvotes
// 		post.upVotes += 1

// 		// add user to upvoters
// 		post.upVoters.push(userId)

// 		// save post
// 		post.save()
// 			.then((result) => {
// 				res.send({
// 					status: res.statusCode,
// 					body: result,
// 					message: 'Post upvoted',
// 				})
// 			})
// 			.catch((err) => {
// 				res.status(401).send({ message: 'Error upvoting post' })
// 				// console.log(err)9
// 			})
// 	}
// }

// exports.downVote = async (req, res) => {
// 	const { postId } = req.body
// 	const userId = req.user

// 	const post = await Post.findById(postId)

// 	// check if user has already downvoted
// 	if (post.downVoters.includes(userId)) {
// 		res.send({
// 			status: res.statusCode,
// 			message: 'User has already downvoted this post',
// 		})
// 	} else {
// 		// check if user has already upvoted
// 		if (post.upVoters.includes(userId)) {
// 			// remove user from upvoters
// 			post.upVoters = post.upVoters.filter((user) => user != userId)

// 			// decrese upvotes by 1
// 			post.upVotes -= 1
// 		}
// 		// increase downvotes
// 		post.downVotes += 1

// 		// add user to downvoters
// 		post.downVoters.push(userId)

// 		// save post
// 		post.save()
// 			.then((result) => {
// 				res.send({
// 					status: res.statusCode,
// 					body: result,
// 					message: 'Post downvoted',
// 				})
// 			})
// 			.catch((err) => {
// 				res.status(401).send({ message: 'Error downvoting post' })
// 				// console.log(err)
// 			})
// 	}
// }

// exports.upVoteSolution = async (req, res) => {
// 	const { solutionId } = req.body
// 	const userId = req.user

// 	const solution = await Solution.findById(solutionId)

// 	// check if user has already upvoted
// 	if (solution.upVoters.includes(userId)) {
// 		res.send({
// 			status: res.statusCode,
// 			message: 'User has already upvoted this solution',
// 		})
// 	} else {
// 		// check if user has already downvoted
// 		if (solution.downVoters.includes(userId)) {
// 			// remove user from downvoters
// 			solution.downVoters = solution.downVoters.filter(
// 				(user) => user != userId
// 			)

// 			// decrese downvotes by 1
// 			solution.downVotes -= 1
// 		}
// 		// increase upvotes
// 		solution.upVotes += 1

// 		// add user to upvoters
// 		solution.upVoters.push(userId)

// 		// save post
// 		solution
// 			.save()
// 			.then((result) => {
// 				res.send({
// 					status: res.statusCode,
// 					body: result,
// 					message: 'Solution upvoted',
// 				})
// 			})
// 			.catch((err) => {
// 				res.status(401).send({ message: 'Error upvoting solution' })
// 				// console.log(err)
// 			})
// 	}
// }

// exports.getAllPosts = async (req, res) => {
// 	const posts = await Post.find().sort({ updatedAt: -1 })

// 	res.send({ status: res.send.statusCode, data: posts })
// }

// exports.getSingleUser = async (req, res) => {
// 	// console.log(req.user)
// 	const user = await User.findOne()
// 	res.status(200).send({ data: user })
// }

// exports.downVoteSolution = async (req, res) => {
// 	const { solutionId } = req.body
// 	const userId = req.user

// 	let solution = await Solution.findById(solutionId)

// 	// check if user has already downvoted
// 	if (solution.downVoters.includes(userId)) {
// 		res.send({
// 			status: res.statusCode,
// 			message: 'User has already downvoted this solution',
// 		})
// 	} else {
// 		// check if user has already upvoted
// 		if (solution.upVoters.includes(userId)) {
// 			// remove user from upvoters
// 			solution.upVoters = solution.upVoters.filter(
// 				(user) => user != userId
// 			)

// 			// decrese upvotes by 1
// 			solution.upVotes -= 1
// 		}
// 		// increase downvotes
// 		solution.downVotes += 1

// 		// add user to downvoters
// 		solution.downVoters.push(userId)

// 		// save solution
// 		solution
// 			.save()
// 			.then((result) => {
// 				res.send({
// 					status: res.statusCode,
// 					body: result,
// 					message: 'Solution downvoted',
// 				})
// 			})
// 			.catch((err) => {
// 				res.status(401).send({ message: 'Error downvoting solution' })
// 				// console.log(err)
// 			})
// 	}
// }

// exports.updateSolutionStatus = async (req, res) => {
// 	const { solutionId, status } = req.body

// 	Solution.findByIdAndUpdate(solutionId, { status })
// 		.then((result) => {
// 			res.send({
// 				status: res.statusCode,
// 				message: 'Solution status updated',
// 			})
// 		})
// 		.catch((err) => {
// 			res.status(401).send({ message: 'Error updating solution status' })
// 			// console.log(err)
// 		})
// }

// exports.getAcceptedUnRedeemedPosts = async (req, res) => {
// 	try {
// 		const posts = await Post.find({ status: 'accepted', redeemed: false })
// 		res.send({ status: res.statusCode, data: posts })
// 	} catch (error) {
// 		res.status(401).send({ message: 'Error getting posts' })
// 	}
// }

// exports.acceptSolution = async (req, res) => {
// 	const { solutionId, postId } = req.body

// 	// update solution status to accepted
// 	Solution.findByIdAndUpdate(solutionId, { status: 'accepted' })
// 		.then((result) => {
// 			// update post status to accepted
// 			Post.findByIdAndUpdate(postId, { acceptedSolution: solutionId })
// 				.then((result) => {
// 					res.send({
// 						status: res.statusCode,
// 						message: 'Solution accepted',
// 					})
// 				})
// 				.catch((err) => {
// 					res.status(401).send({
// 						message: 'Error accepting solution',
// 					})
// 					// console.log(err)
// 				})
// 		})
// 		.catch((err) => {
// 			res.status(401).send({ message: 'Error accepting solution' })
// 			// console.log(err)
// 		})
// }

// exports.getSolutionByPostId = async (req, res) => {
// 	try {
// 		const { postId } = req.params
// 		const solutions = await Solution.find({ postId })
// 		res.send({ status: res.statusCode, data: solutions })
// 	} catch (error) {
// 		res.status(401).send({ message: 'Error getting solutions' })
// 	}
// }
