require('../../../db/mongoose');
const app = require('../../../app.js');
const request = require('supertest');

describe('User API Route', () => {
	beforeEach(() => {
		jest.setTimeout(8000);
	});
	test('create new user', async () => {
		await request(app)
			.post('/api/user')
			.send({
				username: 'Henry Davidson',
				email: 'henry@email.com',
				password: 'mypass123'
			})
			.set('Accept', 'application/json')
			.expect(201);
	});
	test('login user with good credentials', async () => {
		await request(app)
			.post('/api/user/login')
			.send({ email: 'henry@email.com', password: 'mypass123' })
			.expect(200);
	});
	test('prevernt users from doing anything without auth', async () => {
		await request(app)
			.get('/api/user/profile')
			.expect(401);
	});
});
