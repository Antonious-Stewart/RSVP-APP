import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const PrivateRoute = ({
	component: Component,
	auth: { isAuth, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			!isAuth && !loading ? <Redirect to='/login' /> : <Component {...props} />
		}
	/>
);

PrivateRoute.propTypes = {
	isAuth: PropTypes.bool,
	loading: PropTypes.bool
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
