const User = require('../models/user')
let bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
let crypto = require('crypto')
const mailer = require('../mailer')

const creteToken = (_id, role, firstName, lastName, city) => {
	return jwt.sign(
		{ _id, role, firstName, lastName, city },
		process.env.TOKEN_KEY,
		{
			expiresIn: '1d',
		}
	)
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
					// console.log(`New User: ${newUser.firstName}`);
					let token = creteToken(
						newUser._id,
						newUser.role,
						newUser.firstName,
						newUser.lastName,
						newUser.city
					)

					res.send({
						token: token,
						message: 'User Created',
						userId: newUser._id,
						userRole: newUser.role,
						firstName,
						lastName,
						city,
					})
				} catch (error) {
					res.status(401).send({
						error,
					})
				}
			}
		})
		.catch((err) => {
			res.send('Backend error')
		})
}

exports.login = async (req, res) => {
	const { email, password, registrationToken } = req.body
	// console.log(req.body.password);
	User.findOne({ email: email })
		.then(async (user) => {
			const isCorrectPass = await bcrypt.compare(password, user.password)
			if (isCorrectPass) {
				if (
					!user?.registrationToken ||
					user?.registrationToken !== registrationToken
				) {
					user.registrationToken = registrationToken
					await user.save()
				}
				// console.log(`user: ${user.firstName}`) ;
				let token = creteToken(
					user._id,
					user.role,
					user.firstName,
					user.lastName,
					user.city
				)
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
			// console.log(err)
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
				const link = `http://${process.env.FRONTEND_URL}/${token}`

				// send email
				// TODO: Uncomment before pushing to final production
				mailer.sendMail(
					email,
					'Reset Password',
					`Click on the link to reset your password: ${link}`
				)
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
