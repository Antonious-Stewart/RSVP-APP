import * as actionTypes from '../../actions/Auth/types';
//intial state
const intialState = {
	isAuth: null,
	loading: true,
	user: null,
	edit: false
};

//auth reducer
/**
 * @function authReducer
 * Auth reducer for the auth state of the rsvp app
 * @param {Object} state - state of Auth reducer
 * @param {Object} action - current action being taken by reducer
 * @returns Auth state
 */
const authReducer = (state = intialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case actionTypes.LOAD_USER:
			return {
				...state,
				isAuth: true,
				loading: false,
				user: payload
			};
		case actionTypes.AUTH_ERROR:
		case actionTypes.SIGNUP_FAIL:
		case actionTypes.LOGIN_FAIL:
		case actionTypes.LOGOUT:
		case actionTypes.LOGOUT_ALL:
		case actionTypes.DELETE_PROFILE:
			localStorage.removeItem('token');
			return {
				...state,
				isAuth: false,
				loading: false,
				user: null
			};
		case actionTypes.SIGNUP_SUCCESS:
		case actionTypes.LOGIN_SUCCESS:
			localStorage.setItem(
				'token',
				payload.tokens[payload.tokens.length - 1].token
			);
			return {
				...state,
				isAuth: true,
				loading: false,
				user: { ...payload }
			};
		case actionTypes.SAVE_PROFILE_SUCCESS:
			return {
				...state,
				edit: false,
				user: { ...payload }
			};
		case actionTypes.SAVE_PROFILE_FAIL:
			return {
				...state,
				edit: false
			};
		default:
			return {
				...state
			};
	}
};

export default authReducer;
