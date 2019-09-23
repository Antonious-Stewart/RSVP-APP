import * as actionTypes from './types';
import setAuthToken from '../../../Utils/setAuthToken';
import { setAlert } from '../Alerts/creators';
import axios from 'axios';
import faker from 'faker';
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
		dispatch(
			setAlert('Unable To Login In. Email/Password is invalid', 'warning')
		);
	}
};
//logout
const logoutSession = () => {
	return {
		type: actionTypes.LOGOUT
	};
};
// logout action creator
//make call to endpoint to logout of the current session
export const logout = () => async dispatch => {
	try {
		await axios.post('/api/user/logout');
		dispatch(logoutSession());
		dispatch(setAlert('Logged Out', 'dark'));
	} catch (err) {
		console.error(err);
	}
};
//logout
const logoutAllSessions = () => {
	return {
		type: actionTypes.LOGOUT_ALL
	};
};
//logout All action creator
// make call to endpoint to logout of all sessions
export const logoutAll = () => async dispatch => {
	try {
		await axios.post('/api/user/logoutall');
		dispatch(logoutAllSessions());
		dispatch(setAlert('Logged Out of all sessions', 'dark'));
	} catch (err) {
		console.error(err);
	}
};
//save profile successfully action creator
const updateProfileSuccess = result => ({
	type: actionTypes.UPDATE_PROFILE_SUCCESS,
	payload: result.data
});
//save profile failure action creator
const updateProfileFail = () => ({ type: actionTypes.UPDATE_PROFILE_FAIL });

//async save profile to dispatch one of the above action creators
//dependant on response
export const updateProfile = (id, data) => async dispatch => {
	try {
		const res = await axios.patch(`/api/user/profile/${id}/edit`, data);
		dispatch(updateProfileSuccess(res));
	} catch (err) {
		dispatch(updateProfileFail());
	}
};
//action creator for deleting a profile by id
const deleteProfile = res => ({
	type: actionTypes.DELETE_PROFILE,
	payload: res.data._id
});

//async action creator for deleteing a profile
export const deleteUserProfile = id => async dispatch => {
	try {
		const res = await axios.delete(`api/user/profile/${id}`);
		dispatch(deleteProfile(res));
	} catch (err) {
		dispatch({ type: 'ERROR' });
	}
};

// demonstration login for guest to use to test out the site and give feedback
export const demonstration = () => async dispatch => {
	try {
		const res = await axios.post('/api/user', {
			username: faker.name.findName(),
			email: faker.internet.email(),
			location: faker.address.city(),
			attending: [],
			password: 'mypass123'
		});
		dispatch(signUpSuccess(res));
		dispatch(loadUser());
	} catch (err) {
		dispatch(signUpFail());
	}
};
