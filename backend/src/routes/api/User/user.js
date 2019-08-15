const router = require('express').Router();
const User = require('../../../models/User/User.js');
const auth = require('../../../middleware/auth');
//api routes

//signup users
router.post('/', async (req, res) => {
	try {
		const user = new User({ ...req.body });
		if (!user) {
			return res.status(400).send('Bad Request');
		}
		await user.generateAuthToken();
		res.status(201).send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});
//login users
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findByUserCredentials(email, password);
		if (!user) {
			throw new Error();
		}
		await user.generateAuthToken();
		res.status(200).send(user);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});
//signout user
router.post('/logout', auth, async (req, res) => {
	// remove the token the user is currently using from the session
	try {
		req.user.tokens = req.user.tokens.filter(
			token => token.token !== req.token
		);
		await req.user.save();
		res.status(200).send(req.user);
	} catch (err) {
		res.status(500).send(err);
	}
});
//signout all users
router.post('/logoutall', auth, async (req, res) => {
	//remove all tokens from the user document
	try {
		req.user.tokens = [];
		await req.user.save();
		res.status(200).send(req.user);
	} catch (err) {
		res.status(500).send(err);
	}
});
//get user profile
router.get('/profile/', auth, async (req, res) => {
	try {
		res.status(200).send(req.user);
	} catch (err) {
		res.status(500).send(err);
	}
});
//edit user profile
router.patch('/profile/:id/edit', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	//only update direct user data is allowed
	const allowedUpdates = [
		'username',
		'email',
		'password',
		'location',
		'profileImg'
	];
	// check for a match within allowed updates and the req.body
	const isMatch = updates.every(update => allowedUpdates.includes(update));
	try {
		if (isMatch) {
			// iterate through each element in updates array and update req.user
			// to equal the update contained in the req.body
			updates.forEach(update => (req.user[update] = req.body[update]));
			await req.user.save();
			return res.status(200).send(req.user);
		}
	} catch (err) {
		res.status(500).send(err);
	}
});
//delete a user
router.delete('/profile/:id', auth, async (req, res) => {
	try {
		await req.user.remove();
		res.status(202).send(req.user);
	} catch (err) {
		res.status(500).send(err);
	}
});
module.exports = router;
