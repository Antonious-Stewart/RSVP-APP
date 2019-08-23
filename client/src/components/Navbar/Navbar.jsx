import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Bootstrap from 'reactstrap';
import * as authActionCreators from '../../store/actions/Auth/creators';
import Radium from 'radium';
import './Navbar.css';
export class Navbar extends Component {
	static propTypes = {
		auth: PropTypes.bool,
		username: PropTypes.string
	};

	render() {
		return (
			<Bootstrap.Navbar
				data-test='app-Navbar-Component'
				className='bg-success navbar-expand-sm navbar-dark'
				style={{
					fontSize: '1.5rem',
					padding: '1.25rem'
				}}>
				<Link
					to={this.props.auth ? { pathname: '/Profile' } : { pathname: '/' }}
					className=' navbar-brand text-white block'
					style={{
						fontSize: '1.5rem'
					}}>
					{this.props.auth ? this.props.user.username : 'reserveIt'}
				</Link>
				<Bootstrap.NavbarToggler
					className='d-lg-none'
					onClick={this.props.navClick}
				/>
				<div
					className={`${!this.props.show ? 'collapse' : ''} navbar-collapse`}>
					<Bootstrap.Nav className='navbar-nav' onClick={this.props.close}>
						{this.props.auth ? (
							<Fragment>
								<Bootstrap.NavItem>
									<Link className='nav-link' to='/Home'>
										Home
									</Link>
								</Bootstrap.NavItem>
								<Bootstrap.NavItem>
									<Link className='nav-link' to='/Create_Event'>
										Create Event
									</Link>
								</Bootstrap.NavItem>
								<Bootstrap.NavItem>
									<Link className='nav-link' to='/Events'>
										Events
									</Link>
								</Bootstrap.NavItem>
								<Bootstrap.NavItem>
									<Link
										to='/Login'
										className='nav-link'
										onClick={() => this.props.logout()}>
										Logout
									</Link>
								</Bootstrap.NavItem>
							</Fragment>
						) : (
							<Fragment>
								<Bootstrap.NavItem>
									<Link to='/Login' className='nav-link'>
										Login
									</Link>
								</Bootstrap.NavItem>
							</Fragment>
						)}
					</Bootstrap.Nav>
				</div>
			</Bootstrap.Navbar>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth.isAuth,
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(authActionCreators.logout())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Radium(Navbar));
