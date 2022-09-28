const Post = require('../models/posts')

exports.getSearch = async (req, res) => {
	const key = req.params.key
	// console.log(key)
	let data = await Post.find({
		$or: [
			{ title: { $regex: req.params.key } },
			{ description: { $regex: req.params.key } },
			{ categories: { $regex: req.params.key } },
			{ tags: { $regex: req.params.key } },
		],
	})

	res.status(200).send({ data: data })
}
