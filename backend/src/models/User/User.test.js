require('../../db/mongoose');
const User = require('./User');
const mongoose = require('mongoose');

describe('User Model', () => {
	let user;
	const userOneId = mongoose.Types.ObjectId();
	const userOne = {
		username: 'User One',
		email: '	',
		password: 'mypass123',
		attending: [],
		hostedEvents: [],
		_id: userOneId
	};
	beforeEach(async () => {
		await User.deleteMany({});
		user = await new User({ ...userOne });
	});
	test('creates a new user', async () => {
		expect(user).toBeDefined();
	});
});
