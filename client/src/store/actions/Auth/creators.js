import * as actionTypes from './types';
import setAuthToken from '../../../Utils/setAuthToken';
import axios from 'axios';
//load user
const load = result => {
	return {
		type: actionTypes.LOAD_USER,
		payload: result.data
	};
};

//auth error occurence
const authError = () => {
	return {
		type: actionTypes.AUTH_ERROR
	};
};
//async action creator
//set auth token with localStorage.token and pass to axios
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/api/user/profile');
		dispatch(load(res));
	} catch (err) {
		dispatch(authError());
	}
};
//signup success user action creator
const signUpSuccess = result => {
	return {
		type: actionTypes.SIGNUP_SUCCESS,
		payload: result.data
	};
};
//signup success user action creator
const signUpFail = () => {
	return {
		type: actionTypes.SIGNUP_FAIL
	};
};

//async action creators
//signup user data from state and post to api then load user
export const SignUp = result => async dispatch => {
	try {
		const res = await axios.post('/api/user', result);
		dispatch(signUpSuccess(res));
		dispatch(loadUser());
	} catch (err) {
		console.error(err);
		dispatch(signUpFail());
	}
};
// login user action creator
const loginSuccess = result => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		payload: result.data
	};
};
//login failure action creator
const loginFail = () => {
	return {
		type: actionTypes.LOGIN_FAIL
	};
};
//async login action creator
//use user credentials in state and post to api then load user
export const login = data => async dispatch => {
	try {
		const res = await axios.post('/api/user/login', data);
		dispatch(loginSuccess(res));
		dispatch(loadUser());
	} catch (err) {
		dispatch(loginFail());
	}
};
