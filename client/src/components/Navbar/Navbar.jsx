import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Bootstrap from 'reactstrap';

export class Navbar extends Component {
	state = {
		visible: false
	};
	static propTypes = {
		auth: PropTypes.bool
	};
	render() {
		return (
			<Bootstrap.Navbar data-test='app-Navbar-Component' className='bg-success'>
				<Bootstrap.Nav>
					<Link to='/Home' className='navbar navbar-band text-white'>
						Brand
					</Link>
					<li className='nav-item'>
						<Link to='/About' className='nav-link'>
							About
						</Link>
					</li>
					{!this.props.auth ? (
						<li className='nav-item'>
							<Link to='/Login' className='nav-link'>
								Login
							</Link>
						</li>
					) : (
						<Fragment>
							<li className='nav-item'>
								<span className='nav-link text-primary '>Logout</span>
								<span
									onClick={() =>
										this.setState({ visible: !this.state.visible })
									}>
									c
								</span>
								{this.state.visible && (
									<div>
										<span className='nav-link' onClick={this.logoutHandler}>
											Logout
										</span>
										<span
											to='/LogoutAll'
											className='nav-link'
											onClick={this.logoutAllHandler}>
											LogoutAll
										</span>
									</div>
								)}
							</li>
							<li className='nav-item'>
								<Link to='/Create_Event' className='nav-link'>
									Create Event
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/Profile' className='nav-link'>
									Profile
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

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
