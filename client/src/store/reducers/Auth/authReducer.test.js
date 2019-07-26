import authReducer from './authReducer';

describe('Auth reducer', () => {
	test('get default auth state', () => {
		const reducer = authReducer(undefined, {});
		expect(reducer).toEqual({});
	});
});
