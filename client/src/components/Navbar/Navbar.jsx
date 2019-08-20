import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as Bootstrap from 'reactstrap';
import * as authActionCreators from '../../store/actions/Auth/creators';
import * as eventActionCreators from '../../store/actions/Events/creators';
import './Navbar.css';
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
			<Bootstrap.Navbar
				data-test='app-Navbar-Component'
				className='bg-success'
				style={{ fontSize: '1.5rem', padding: '1.25rem' }}>
				{this.state.redirect && <Redirect to='/Events' />}
				<Bootstrap.Nav>
					{this.props.auth ? (
						<Fragment>
							<Link
								to='/Profile'
								className=' navbar-brand text-white block'
								style={{ fontSize: '1.5rem' }}>
								{this.props.user.username}
							</Link>
							<li className='nav-item'>
								<Link
									to='/Login'
									className='nav-link text-dark'
									onClick={() => this.props.logout()}>
									Logout
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/Create_Event' className='nav-link text-dark'>
									Create Event
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link text-dark' to='/Home'>
									Home
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/Events' className='nav-link text-dark'>
									Events
								</Link>
							</li>
						</Fragment>
					) : (
						<Fragment>
							<Link
								to='/'
								className='navbar-brand text-white'
								style={{ fontSize: '1.5rem' }}>
								reserveIt
							</Link>
							<li className='nav-item'>
								<Link to='/Login' className='nav-link text-dark'>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/About' className='nav-link text-dark'>
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
	auth: state.auth.isAuth,
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(authActionCreators.logout()),
	search: query => dispatch(eventActionCreators.search(query))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
