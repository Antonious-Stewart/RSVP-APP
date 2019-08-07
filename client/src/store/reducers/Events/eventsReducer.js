import * as actionTypes from '../../actions/Events/types';

const initState = {
	loading: true,
	events: [],
	selectedEvent: [],
	edit: null,
	cancelRsvp: null
};

export default (state = initState, action) => {
	const { type, payload } = action;
	switch (type) {
		case actionTypes.CREATE_EVENT_SUCCES:
			return {
				...state,
				events: [...state.events, payload]
			};
		case actionTypes.GET_EVENTS_SUCCESS:
			return {
				...state,
				loading: false,
				events: [...state.events, payload].flat(1)
			};
		case actionTypes.CANCEL_RSVP:
			return {
				...state,
				cancelRsvp: true,
				events: state.events.filter(event =>
					payload.attending.includes(event.title)
				)
			};
		case actionTypes.VIEW_EVENT_SUCCESS:
			return {
				...state,
				selectedEvent: [payload]
			};
		default:
			return {
				...state
			};
	}
};
