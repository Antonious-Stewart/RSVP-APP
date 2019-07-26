//intial state
const intialState = {};

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
		default:
			return {
				...state
			};
	}
};

export default authReducer;
