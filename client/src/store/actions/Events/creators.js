import * as actionTypes from './types';
import axios from 'axios';
import { setAlert } from '../Alerts/creators';

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
// call events endpoint to get events user is attending
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
//make call to rsvp endpoint to allow users to rsvp to events
export const rsvp = id => async dispatch => {
	try {
		const res = await axios.post(`/api/events/rsvp/${id}`);
		dispatch(rsvpSuccess(res));
		dispatch(setAlert("Successfully RSVP'd", 'success'));
	} catch (err) {
		dispatch(rsvpFail());
		dispatch(setAlert("Can't RSVP to this event at this time"));
	}
};
//cancel rsvp to events the user has rsvp'd to
export const cancelRsvp = id => async dispatch => {
	try {
		const res = await axios.post(`/api/events/cancel rsvp/${id}`);
		dispatch(cancelSuccess(res));
		dispatch(setAlert('You have canceled your resvervation.', 'success'));
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
//make call to create endpoint to create a new event
export const createEvent = data => async dispatch => {
	try {
		const res = await axios.post('/api/events/create', data);
		dispatch(createEventSuccess(res));
		dispatch(setAlert('Successfully created event!', 'success'));
	} catch {
		dispatch(createEventFail());
		dispatch(setAlert('Error creating event try again', 'warning'));
	}
};
const viewEventSuccess = res => ({
	type: actionTypes.VIEW_EVENT_SUCCESS,
	payload: res.data
});
const viewEventFail = res => ({
	type: actionTypes.VIEW_EVENT_FAIL
});
//make call to view event endpoint to create a new event
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
		dispatch(setAlert('No events found by that title', 'dark'));
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
		dispatch(setAlert('Successfully updated event', 'success'));
	} catch (err) {
		dispatch(saveEventFail());
		dispatch(setAlert('Error in updating event', 'warning'));
	}
};
//action creator for deleting a event by its id
const deleteById = result => ({
	type: actionTypes.DELETE_EVENT,
	payload: result.data._id
});
//turn delete flag on to open delete event modal
export const toDelete = () => ({ type: actionTypes.TO_DELETE_EVENT });
//turn delete flag off to close delete event modal
export const cancelDelete = () => ({ type: actionTypes.TO_CANCEL_DELETE });
//make request to endpoint to delete the event and get a 200 status code
//with the deleted event as the response
export const deleteEvent = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/events/${id}`);
		dispatch(deleteById(res));
		dispatch(setAlert('Successfully deleted Event', 'danger'));
	} catch (err) {
		dispatch({ type: actionTypes.ERROR });
	}
};
