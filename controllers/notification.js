const { pickBy } = require('lodash')
const { admin } = require('../utils/firebase')
const User = require('../models/user')

const notifyUsers = async (title, description, link) => {
	const results = await User.find().select({ _id: 0, registrationToken: 1 })

	// await User.updateMany({}, { $set: { toNotified: true } });

	let token = []
	results.forEach((d) => {
		const cleanedObject = pickBy(
			d,
			(v) => v !== undefined && v !== '' && v !== null
		)
		if (cleanedObject.registrationToken) {
			token.push(cleanedObject.registrationToken)
		}
	})

	const filteToken = token.filter(
		(t) => t !== undefined || t !== null || t !== 'undefined'
	)

	// This registration token comes from the client FCM SDKs.
	const registrationToken = filteToken
	let notification = {
		title: title,
		body: description,
	}
	// console.log(token)
	const message = {
		notification,
	}

	// Send a message to the device corresponding to the provided
	// registration token.

	if (registrationToken.length !== 0)
		admin
			.messaging()
			.sendToDevice(registrationToken, message)
			.then((response) => {
				// console.log(
				// 	'Successfully sent message:',
				// 	response,
				// 	response.results[0].error
				// )
				// res.status(200).send("message sent");
			})
			.catch((error) => {
				// console.log('Error sending message:', error)
			})
}

exports.notifyUsers = notifyUsers
