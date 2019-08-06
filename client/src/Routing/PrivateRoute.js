import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuth ? <Component {...props} /> : <Redirect to='/Login' />
		}
	/>
);

PrivateRoute.propTypes = {
	isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(PrivateRoute);
