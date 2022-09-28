const userModel = require('../models/user')
let bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
let crypto = require('crypto')
const { sendMail } = require('../utils')

const creteToken = (_id) => {
	return jwt.sign({ _id }, process.env.TOKEN_KEY, { expiresIn: '1d' })
}

exports.login = async (req, res) => {
	const { email, password } = req.body

	userModel
		.findOne({ email: email })
		.then(async (user) => {
			const isCorrectPass = await bcrypt.compare(password, user.password)
			// console.log(token)
			if (isCorrectPass) {
				var token = creteToken(user._id)

				// await req.session.save();
				res.send({ token: token, userId: user._id })
			} else {
				res.status(401).send({ message: 'Error' })
			}
		})
		.catch((err) => {
			res.status(401).send({ message: 'User with this email not found' })
			console.log(err)
		})
}

exports.signUp = async (req, res) => {
	const { email, password, userName, name } = req.body

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	userModel
		.findOne({ email: email })
		.then(async (user) => {
			if (user) {
				res.status(400).send({
					message: 'User already exists with this email',
				})
			} else {
				try {
					const newUser = await userModel.create({
						email,
						password: hashedPassword,
						userName,
						name,
						points: 0,
						role: 'user',
					})
					// newUser.save();
					var token = creteToken(newUser._id)

					// console.log(process.env.TOKEN_KEY)
					res.send({ token: token, userId: newUser._id })
				} catch (error) {
					res.status(401).send({
						message: 'Username or email must not be same',
					})
				}
			}
		})
		.catch((err) => {
			res.send('Backend error')
		})
}

exports.askResetPassword = async (req, res) => {
	const { email } = req.body
	userModel
		.findOne({ email: email })
		.then(async (user) => {
			if (user) {
				// generate random token
				const token = crypto.randomBytes(20).toString('hex')

				// Put token in mongo
				user.resetPasswordToken = token
				user.resetPasswordExpires = Date.now() + 3600000
				await user.save()

				// generate reset link
				// const link = `http://127.0.0.1:3100/auth/reset-password/${token}`;
				const link = `http://${process.env.URL}/auth/reset-password/${token}`

				// send email
				sendMail(
					email,
					'Reset Password',
					`Click on the link to reset your password: ${link}`
				)
				res.send({ message: 'Email sent' })
			} else {
				res.status(400).send({ message: 'User does not exist' })
			}
		})
		.catch((err) => {
			res.status(401).send({ message: 'Backend error: ' + err })
		})
}

exports.resetPassword = async (req, res) => {
	const { password, token } = req.body

	userModel
		.findOne({
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
				//sendMail(user.email, "Password Changed", "Your password has been changed");
				res.send({ message: 'Password reset successful' })
			} else {
				res.status(400).send({
					message: 'Password reset link is invalid or has expired',
				})
			}
		})
		.catch((err) => {
			res.status(401).send({ message: 'Backend error: ' + err })
		})
}

exports.postLogout = async (req, res) => {
	req.session.destroy((err) => {
		res.send({ message: 'success' })
	})
}

exports.isUserNameAvailable = async (req, res) => {
	const { userName } = req.body
	userModel
		.findOne({ userName: userName })
		.then(async (user) => {
			if (user) {
				res.send({
					message: 'Username already taken',
					isAvailable: false,
				})
			} else {
				res.send({ message: 'Username available', isAvailable: true })
			}
		})
		.catch((err) => {
			res.status(401).send({ message: 'Backend error: ' + err })
		})
}
