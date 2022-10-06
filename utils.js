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

// // let sendMail = async (email, subject, text) => {
// //     let transporter = nodemailer.createTransport({
// //         host: "smtp-mail.outlook.com",
// //         port: 587,
// //         secure: false, // true for 465, false for other ports
// //         auth: {
// //             user: "techathon2022@outlook.com", // generated ethereal user
// //             pass: "qwerty1234x", // generated ethereal password
// //         },
// //     });

// //     // send mail with defined transport object
// //     await transporter.sendMail({
// //         from: '"Techathon 2022" <techathon2022@outlook.com', // sender address
// //         to: email, // list of receivers
// //         subject: subject, // Subject line
// //         text: text, // plain text body
// //         html: "<p>" + text + "</p>", // html body
// //     }, (err, info) => {
// //         if (err) {
// //             console.log(err);
// //             return;
// //         } else {
// //             console.log(info);
// //         }

// //     });

// // }

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
	}
	const { Body } = await s3.getObject(params).promise()
	return Body
}

module.exports.downloadFile = downloadFile
