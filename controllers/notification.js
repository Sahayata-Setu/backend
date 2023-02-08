const { pickBy } = require('lodash')
const { admin } = require('../utils/firebase')
const User = require('../models/user')

const notifyUsers = async (title, description, isRecieve) => {
	let results = []

	// await User.updateMany({}, { $set: { toNotified: true } });
	if(isRecieve) {
		 results = await User.find({_id: isRecieve}).select({ _id: 0, registrationToken: 1 })
	
	}
	else {
		results = await User.find({}).select({ _id: 0, registrationToken: 1 })
	}

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
	// console.log(registrationToken);

	// Send a message to the device corresponding to the provided
	// registration token.

	if (registrationToken.length !== 0)
		admin
			.messaging()
			.sendToDevice(registrationToken, message)
			.then((response) => {
					console.log(
						'Successfully sent message:',
						response,
						response.results[0].error
					)
				// res.status(200).send('message sent')
			})
			.catch((error) => {
				console.log('Error sending message:', error)
				// res.status(400).send('message not sent')
			})
}

exports.notifyUsers = notifyUsers
