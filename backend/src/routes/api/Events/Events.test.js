require('../../../db/mongoose');
const app = require('../../../app');
const request = require('supertest');

describe('Events', () => {
	test('Get all events from db', async () => {
		await request(app)
			.get('/api/events')
			.expect(200);
	});
});
