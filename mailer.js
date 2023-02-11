const nodemailer = require('nodemailer')

exports.sendMail = async (email, subject, text) => {
	let transporter = nodemailer.createTransport({
		host: 'smtp-mail.outlook.com',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'sahayatasetu@outlook.com',
			pass: 'qwertyuiop0987654321',
		},
	})

	// send mail with defined transport object
	await transporter.sendMail(
		{
			from: '"Sahayata Setu" <sahayatasetu@outlook.com', // sender address
			to: email, // list of receivers
			subject: subject, // Subject line
			text: text, // plain text body
			html: '<p>' + text + '</p>', // html body
		},
		(err, info) => {
			if (err) {
				console.log(err)
				return
			} else {
				console.log(info)
			}
		}
	)
}
