const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
	// if (!req.session.isLoggedIn) {
	// return res.redirect("/login");
	// }
	const { authorization } = req.headers
	// console.log(authorization)

	if (!authorization)
		return res.status(401).json({
			error: 'Authorization token required.',
		})
	const token = authorization.split(' ')[1]
	// console.log(token);

	// console.log(jwt.verify(token, process.env.TOKEN_KEY));
	try {
		const { _id } = jwt.verify(token, process.env.TOKEN_KEY)
		req.user = _id
		// console.log("this is body", req.body)
		next()
	} catch (error) {
		res.status(401).json({ message: 'Invalid Token' })
		return
	}
	// next();
}

module.exports = auth
