import axios from 'axios';

//set auth token in headers
/**
 * @param {token} - token to be passed into axios headers
 * @returns
 */
const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
