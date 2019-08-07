import * as actionTypes from './types';
import axios from 'axios';
import setAuthToken from '../../../Utils/setAuthToken';

const getEventSuccess = result => {
	return {
		type: actionTypes.GET_EVENTS_SUCCESS,
		payload: result.data
	};
};
const getEventsFail = () => {
	return {
		type: actionTypes.GET_EVENTS_FAIL
	};
};

export const getEvents = () => async dispatch => {
	try {
		await setAuthToken(localStorage.token);
		const res = await axios.get('/api/events/');
		dispatch(getEventSuccess(res));
	} catch (err) {
		dispatch(getEventsFail());
	}
};
const cancelSuccess = res => {
	return {
		type: actionTypes.CANCEL_RSVP,
		payload: res.data
	};
};

export const cancelRsvp = id => async dispatch => {
	try {
		const res = await axios.post(`/api/events/cancel rsvp/${id}`);
		dispatch(cancelSuccess(res));
	} catch (err) {
		console.error(err);
		return err;
	}
};
const createEventSuccess = result => {
	return {
		type: actionTypes.CREATE_EVENT_SUCCES,
		payload: result.data
	};
};
const createEventFail = () => {
	return {
		type: actionTypes.CREATE_EVENT_FAIL
	};
};

export const createEvent = data => async dispatch => {
	try {
		const res = await axios.post('/api/events/create', data);
		dispatch(createEventSuccess(res));
	} catch {
		dispatch(createEventFail());
	}
};
const viewEventSuccess = res => ({
	type: actionTypes.VIEW_EVENT_SUCCESS,
	payload: res.data
});
const viewEventFail = res => ({
	type: actionTypes.VIEW_EVENT_FAIL
});

export const viewEvent = id => async dispatch => {
	try {
		const res = await axios.get(`/api/events/${id}`);
		dispatch(viewEventSuccess(res));
	} catch (err) {
		dispatch(viewEventFail());
	}
};
