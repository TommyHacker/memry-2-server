const request = require('supertest');
let app;
const api = require('../app');
const port = 5001;

describe('api tests', () => {
	beforeAll(async () => {
		app = await api.listen(port, () => console.log(`test server:${port}`));
	});
	afterAll(async () => {
		const closed = await app.close();
	});

	test('should return json response.', async () => {
		const res = await request(app).get('/');
		expect(res.text).toBe('api root route.');
	});
});
