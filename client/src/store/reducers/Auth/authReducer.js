import * as actionTypes from '../../actions/Auth/types';
import * as eventActionTypes from '../../actions/Events/types';
//intial state
const intialState = {
	isAuth: null,
	loading: true,
	user: null,
	edit: false,
	delete: false,
	logoutAll: false
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
				edit: false,
				logoutAll: false,
				delete: false,
				user: null
			};
		case actionTypes.SIGNUP_SUCCESS:
		case actionTypes.LOGIN_SUCCESS:
		case actionTypes.DEMO:
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
		case actionTypes.UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				edit: false,
				user: { ...payload }
			};
		case actionTypes.UPDATE_PROFILE_FAIL:
			return {
				...state,
				edit: false
			};
		case actionTypes.EDIT_PROFILE:
			return {
				...state,
				edit: true
			};
		case actionTypes.TO_DELETE_PROFILE:
			return {
				...state,
				delete: true
			};
		case actionTypes.CANCEL_DELETE:
			return {
				...state,
				delete: false
			};
		case actionTypes.TO_LOGOUT_ALL:
			return {
				...state,
				logoutAll: true
			};
		case actionTypes.CANCEL_LOGOUT:
			return {
				...state,
				logoutAll: false
			};
		case eventActionTypes.RSVP_SUCCESS:
			return {
				...state,
				user: { ...payload }
			};
		case eventActionTypes.CANCEL_RSVP:
			return {
				...state,
				user: { ...payload }
			};
		case eventActionTypes.CREATE_EVENT_SUCCES:
			return {
				...state,
				user: {
					...state.user,
					attending: [...state.user.attending, payload.title]
				}
			};

		default:
			return {
				...state
			};
	}
};

export default authReducer;
