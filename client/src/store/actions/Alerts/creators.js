import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, alertType) => async dispatch => {
	try {
		const id = uuid.v4();
		dispatch({ type: SET_ALERT, payload: { msg, alertType, id } });
		await setTimeout(() => {
			dispatch({ type: REMOVE_ALERT, payload: id });
		}, 5000);
	} catch (err) {
		console.error(err);
	}
};
