const jwt = require('jsonwebtoken');
const User = require('../models/User/User');

// auth middleware
/**
 * @function auth
 * Gets user info from token to check for authentication
 * @param {Object} req - Server request
 * @param {Object} res - Server Response
 * @param {Object} next - Next procces to be run
 */
const auth = async (req, res, next) => {
	try {
		//get Bear token from Authorization header
		const token = req.header('Authorization').replace('Bearer ', '');
		//decode token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		//find user by decoded.id and token
		const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });
		if (!user) {
			throw new Error();
		}
		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		return res.status(401).send('Please Authenticate');
	}
};

module.exports = auth;
