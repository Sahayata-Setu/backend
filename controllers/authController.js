const User = require('../models/user')
let bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
let crypto = require('crypto')
// const { sendMail } = require('../utils')

const creteToken = (_id, role) => {
	return jwt.sign({ _id, role }, process.env.TOKEN_KEY, { expiresIn: '1d' })
}

exports.signUp = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		phoneNo,
		address,
		profilePic,
		city,
		gender,
		language,
		password,
	} = req.body

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	User.findOne({ email: email })
		.then(async (user) => {
			if (user) {
				res.status(400).send({
					message: 'User already exists with this email',
				})
			} else {
				try {
					const newUser = await User.create({
						firstName,
						lastName,
						email,
						phoneNo,
						address,
						profilePic,
						city,
						gender,
						language,
						password: hashedPassword,
					})

					let token = creteToken(newUser._id, newUser.role)

					res.send({
						token: token,
						message: 'User Created',
						userId: newUser._id,
						userRole: newUser.role,
					})
				} catch (error) {
					console.log(error)
					res.status(401).send({
						message: error,
					})
				}
			}
		})
		.catch((err) => {
			res.send('Backend error')
		})
}

exports.login = async (req, res) => {
	const { email, password } = req.body

	User.findOne({ email: email })
		.then(async (user) => {
			const isCorrectPass = await bcrypt.compare(password, user.password)
			if (isCorrectPass) {
				let token = creteToken(user._id, user.role)
				res.send({
					token: token,
					message: 'User login successful',
					userId: user._id,
					userRole: user.role,
				})
			} else {
				res.status(401).send({ message: 'Invalid credentials' })
			}
		})
		.catch((err) => {
			res.status(401).send({ message: 'User with this email not found' })
			console.log(err)
		})
}

exports.askResetPassword = async (req, res) => {
	const { email } = req.body
	User.findOne({ email: email })
		.then(async (user) => {
			if (user) {
				// generate random token
				const token = crypto.randomBytes(20).toString('hex')

				// Put token in mongo
				user.resetPasswordToken = token
				user.resetPasswordExpires = Date.now() + 3600000
				await user.save()

				// generate reset link
				const link = `http://${process.env.FRONTEND_URL}/auth/reset-password/${token}`

				// send email
				// TODO: Uncomment before pushing to final production
				// sendMail(
				// 	email,
				// 	'Reset Password',
				// 	`Click on the link to reset your password: ${link}`
				// )
				res.send({
					message: 'Reset email sent. Link valid for 1 hour.',
				})
			} else {
				res.status(400).send({ message: 'User does not exist' })
			}
		})
		.catch((err) => {
			res.status(401).send({ message: 'Backend error: ' })
		})
}

exports.resetPassword = async (req, res) => {
	const { password, token } = req.body

	User.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() },
	})
		.then(async (user) => {
			if (user) {
				const salt = await bcrypt.genSalt(10)
				const hashedPassword = await bcrypt.hash(password, salt)
				user.password = hashedPassword
				user.resetPasswordToken = undefined
				user.resetPasswordExpires = undefined
				await user.save()
				// TODO: Uncomment before pushing to final production
				//sendMail(user.email, "Password Changed", "Your password has been changed");
				res.send({ message: 'Password reset successful' })
			} else {
				res.status(400).send({
					message: 'Password reset link is invalid or has expired',
				})
			}
		})
		.catch((err) => {
			res.status(401).send({ message: 'Backend error: ' })
		})
}

// exports.postLogout = async (req, res) => {
// 	req.session.destroy((err) => {
// 		res.send({ message: 'success' })
// 	})
// }
