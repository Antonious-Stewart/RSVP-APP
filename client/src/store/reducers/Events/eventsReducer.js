import * as actionTypes from '../../actions/Events/types';

const initState = {
	loading: true,
	fetchUserEvents: true,
	events: [],
	selectedEvent: [],
	searchedEvents: [],
	edit: null,
	cancelRsvp: null,
	delete: null
};

export default (state = initState, action) => {
	const { type, payload } = action;
	switch (type) {
		case actionTypes.CREATE_EVENT_SUCCES:
			return {
				...state,
				events: [...state.events, payload],
				fetchUserEvents: true
			};
		case actionTypes.GET_EVENTS_SUCCESS:
			return {
				...state,
				loading: false,
				fetchUserEvents: false,
				events: [...state.events, ...payload],
				search: false,
				searchedEvents: [],
				selectedEvent: []
			};
		case actionTypes.GET_EVENTS_FAIL:
			return {
				...state,
				loading: false,
				fetchUserEvents: false
			};
		case actionTypes.EDIT_EVENT:
			return {
				...state,
				edit: true
			};
		case actionTypes.SAVE_EVENT_SUCCESS:
			return {
				...state,
				edit: false,
				selectedEvent: [payload]
			};
		case actionTypes.SAVE_EVENT_FAIL:
			return {
				...state,
				edit: false
			};
		case actionTypes.CANCEL_RSVP:
			return {
				...state,
				cancelRsvp: true,
				events: state.events.filter(event =>
					payload.attending.includes(event.title)
				)
			};
		case actionTypes.RSVP_SUCCESS:
			return {
				...state,
				fetchUserEvents: true
			};
		case actionTypes.VIEW_EVENT_SUCCESS:
			return {
				...state,
				selectedEvent: [payload]
			};
		case actionTypes.SEARCH_EVENTS_SUCCESS:
		case actionTypes.SEARCH:
			return {
				...state,
				search: true,
				fetchUserEvents: true,
				events: [],
				searchedEvents: payload
			};
		case actionTypes.SEARCH_EVENTS_FAIL:
			return {
				...state,
				search: false,
				fetchUserEvents: true,
				searchedEvents: []
			};
		case actionTypes.TO_DELETE_EVENT:
			return {
				...state,
				delete: true
			};
		case actionTypes.TO_CANCEL_DELETE:
			return {
				...state,
				delete: false
			};
		case actionTypes.DELETE_EVENT:
			return {
				...state,
				delete: false,
				selectedEvent: [],
				events: state.events.filter(event => event !== payload)
			};
		default:
			return {
				...state
			};
	}
};
