import React from 'react';
import PropTypes from 'prop-types';

export default function LoginButton(props) {
	LoginButton.propTypes = {
		login: PropTypes.func
	};
	return <button onClick={props.login}>Login</button>;
}
