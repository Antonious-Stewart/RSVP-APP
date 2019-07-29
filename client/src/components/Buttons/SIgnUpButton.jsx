import React from 'react';
import PropTypes from 'prop-types';

export default function SignUpButton(props) {
	SignUpButton.propTypes = {
		signUp: PropTypes.func
	};
	return <button onClick={props.signUp}>SignUp</button>;
}
