import * as actionTypes from './types';
import axios from 'axios';

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
const rsvpSuccess = res => ({
	type: actionTypes.RSVP_SUCCESS,
	payload: res.data
});
const rsvpFail = () => ({ type: actionTypes.RSVP_FAIL });

export const rsvp = id => async dispatch => {
	try {
		const res = await axios.post(`/api/events/rsvp/${id}`);
		dispatch(rsvpSuccess(res));
	} catch (err) {
		dispatch(rsvpFail());
	}
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
//action creator to search for events that are queried
const searchQuery = query => ({
	type: actionTypes.SEARCH,
	payload: query.data
});
//action creator search db for all events
const searchSuccess = query => ({
	type: actionTypes.SEARCH_EVENTS_SUCCESS,
	payload: query.data
});
//action creator for a failed query search
const searchFail = () => ({ type: actionTypes.SEARCH_EVENTS_FAIL });

//search db query and dispatch action with a success if a 200 is passed
// and a fail if anything is send in the response
export const search = query => async dispatch => {
	try {
		let res;
		// if no query is provided then pull all events from the db
		if (!query) {
			res = await axios.get('/api/events/?search=');
			return dispatch(searchSuccess(res));
		}
		// pull all events that match the query
		res = await axios.get(`/api/events/?search=${query}`);
		dispatch(searchQuery(res));
	} catch (err) {
		dispatch(searchFail());
	}
};
// action creator to change edit state to true
export const edit = () => ({ type: actionTypes.EDIT_EVENT });
//action creator to change auth state of edit to false and save editted event
const saveEventSuccess = result => ({
	type: actionTypes.SAVE_EVENT_SUCCESS,
	payload: result.data
});
//action creator to have edit state to remain true if the save attempt fails
export const saveEventFail = () => ({ type: actionTypes.SAVE_EVENT_FAIL });
//async action creator to dispatch events according to attempt success or fail
export const editEvent = (id, data) => async dispatch => {
	try {
		const res = await axios.patch(`/api/events/${id}/edit`, data);
		dispatch(saveEventSuccess(res));
	} catch (err) {
		dispatch(saveEventFail());
	}
};
//action creator for deleting a event by its id
const deleteById = result => ({
	type: actionTypes.DELETE_EVENT,
	payload: result.data._id
});
export const deleteEvent = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/events/${id}`);
		dispatch(deleteById(res));
	} catch (err) {
		dispatch({ type: actionTypes.ERROR });
	}
};
