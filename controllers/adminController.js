const Post = require('../models/posts')
let bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
let crypto = require('crypto')
const { sendMail } = require('../utils')

// exports.getPostsByStatus = async (req, res) => {
// 	const { status } = req.params
// 	const posts = await Post.find({ status })
// 	res.send(posts)
// }

// exports.updatePostStatus = async (req, res) => {
// 	const { id, status } = req.body
// 	await Post.findByIdAndUpdate(id, { status })
// 	// get post by id
// 	const post = await Post.findById(id)
// 	res.send({ message: 'Post status updated successfully', body: post })
// }

// exports.assignRewardPoints = async (req, res) => {
// 	const { id, points } = req.body
// 	await Post.findByIdAndUpdate(id, { points })
// 	// get post by id
// 	const post = await Post.findById(id)
// 	res.send({ message: 'Post points updated successfully', body: post })
// }
