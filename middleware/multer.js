const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
// const express = require('express')
const multer = require('multer')

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'hackgujarat2022',
		format: async (req, file) => file.originalname.split('.').pop(),
		public_id: (req, file) =>
			Date.now().toString() + '-' + file.originalname,
	},
})

const upload = multer({ storage: storage })

// app.post('/upload', parser.single('image'), function (req, res) {
// 	res.json(req.file)
// })

module.exports = upload
