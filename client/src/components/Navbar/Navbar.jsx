import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as Bootstrap from 'reactstrap';
import * as authActionCreators from '../../store/actions/Auth/creators';
import * as eventActionCreators from '../../store/actions/Events/creators';

export class Navbar extends Component {
	state = {
		search: '',
		redirect: false
	};
	static propTypes = {
		auth: PropTypes.bool,
		logout: PropTypes.func,
		logoutAll: PropTypes.func
	};
	render() {
		return (
			<Bootstrap.Navbar data-test='app-Navbar-Component' className='bg-success'>
				{this.state.redirect && <Redirect to='/Events' />}
				<Bootstrap.Nav>
					{this.props.auth ? (
						<Fragment>
							<Link to='/Home' className=' navbar-brand'>
								{this.props.username}
							</Link>
							<li className='nav-item'>
								<Link
									to='/Login'
									className='nav-link'
									onClick={() => this.props.logout()}>
									Logout
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/Create_Event' className='nav-link'>
									Create Event
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/Profile'>
									Profile
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/Events' className='nav-link'>
									Events
								</Link>
							</li>
						</Fragment>
					) : (
						<Fragment>
							<Link to='/' className='navbar-brand'>
								ReserveIt
							</Link>
							<li className='nav-item'>
								<Link to='/Login' className='nav-link'>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/About' className='nav-link'>
									About
								</Link>
							</li>
						</Fragment>
					)}
				</Bootstrap.Nav>
			</Bootstrap.Navbar>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(authActionCreators.logout()),
	search: query => dispatch(eventActionCreators.search(query))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
