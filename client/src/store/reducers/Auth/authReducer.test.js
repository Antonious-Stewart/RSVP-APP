import authReducer from './authReducer';
import * as actionTypes from '../../actions/Auth/types';
import * as actionCreators from '../../actions/Auth/creators';
import { store } from '../../../Utils/testUtils';
const setupReducer = (
	state = {
		isAuth: null,
		loading: true,
		token: '',
		user: null
	},
	action = {}
) => {
	return authReducer(state, action);
};

describe('Auth reducer', () => {
	let reducer;
	test('get default auth state', () => {
		reducer = setupReducer(undefined, {});
		expect(reducer).toEqual({
			isAuth: null,
			loading: true,
			token: '',
			user: null
		});
	});
});
