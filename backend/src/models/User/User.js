const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// userschema to have fields:
//email password username to be strings
//attending to be array of objects containing events
// hostedEvents to be array of objects
// jwt for authentication
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		//validate for a valid email
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Invalid Email address');
			}
		},
		unique: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		// validate that password doesnt contain username, email or 'password'
		validate(value) {
			if (
				value.includes(this.email) ||
				value.includes(this.username) ||
				value.includes('password')
			) {
				throw new Error('Invalid Passowrd');
			}
		}
	},
	attending: [Object],
	hostedEvents: [
		{
			events: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Event',
				required: true
			}
		}
	],
	tokens: [
		{
			token: {
				required: true,
				type: String
			}
		}
	]
});

// hash user password before saving to database
userSchema.pre('save', async function(next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});
//generate auth token to be used on Instance of User
userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};
// hide password from users
userSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;

	return userObject;
};
//find user by credentials email and password
userSchema.statics.findByUserCredentials = async (email, password) => {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error();
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error();
		}
		return user;
	} catch (err) {
		console.error('Unable to login');
	}
};

const User = mongoose.model('User', userSchema);

module.exports = User;
