const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization)
		return res.status(401).json({
			error: 'Authorization token required.',
		})
	const token = authorization.split(' ')[1]

	try {
		const { _id, role, firstName, lastName, city } = jwt.verify(
			token,
			process.env.TOKEN_KEY
		)
		// console.log('X: ', _id, role, firstName, lastName, city)
		req.user = { id: _id, role, firstName, lastName, city }
		// console.log('Auth: ', req.user)
		next()
	} catch (error) {
		res.status(401).json({ message: 'Invalid Token' })
		return
	}
}

module.exports = auth
