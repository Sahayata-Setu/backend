// const multer = require('multer')
// const path = require('path')
// const nodemailer = require('nodemailer')
// const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

// var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'uploads')
// 	},
// 	filename: (req, file, cb) => {
// 		let ext = path.extname(file.originalname)
// 		// console.log(file.originalname);
// 		cb(null, file.originalname + Date.now() + ext)
// 	},
// })

// var upload = multer({
// 	storage: storage,
// 	fileFilter: (req, file, cb) => {
// 		if (
// 			file.mimetype == 'image/jpg' ||
// 			file.mimetype == 'image/png' ||
// 			file.mimetype == 'image/jpeg'
// 		) {
// 			cb(null, true)
// 		} else {
// 			cb(null, false)
// 		}
// 	},
// })

// const deleteFile = (filePath) => {
// 	fs.unlink(filePath, (err) => {
// 		if (err) {
// 			throw err
// 		}
// 	})
// }

// module.exports = upload
// // module.exports.sendMail = sendMail
// module.exports.deleteFile = deleteFile

// Download file from S3
const downloadFile = async (key) => {
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: key,
		region: process.env.REGION,
	}
	const { Body } = await s3.getObject(params).promise()
	return Body
}

module.exports.downloadFile = downloadFile
