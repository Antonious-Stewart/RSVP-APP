import { SET_ALERT, REMOVE_ALERT } from '../../actions/Alerts/types';

const initState = [];

export default (state = initState, action) => {
	const { payload, type } = action;
	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case REMOVE_ALERT:
			return [...state, state.filter(alert => alert.id !== payload.id)];
		default:
			return {
				...state
			};
	}
};
