import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Auth/creators';
import * as actionTypes from '../../store/actions/Auth/types';
import Radium from 'radium';
import LogoutAllModal from '../Modals/LogoutAllModal';
import DeleteModal from '../Modals/DeleteModal';

export class Profile extends Component {
	state = {
		username: this.props.username,
		email: this.props.email,
		location: this.props.location,
		id: this.props.id,
		valid: ''
	};
	static propTypes = {
		username: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		edit: PropTypes.bool.isRequired,
		logout: PropTypes.bool.isRequired,
		deleteUser: PropTypes.bool.isRequired
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	render() {
		const { username, email, location } = this.state;
		const profileStyles = {
			height: '100vh',
			padding: '4rem',
			'@media (max-width:575px)': {
				padding: '2rem'
			}
		};
		return (
			<div style={profileStyles}>
				{this.props.deleteUser && (
					<DeleteModal
						closeBackdrop={this.props.cancelDelete}
						change={evt => {
							const { name, value } = evt.target;
							this.setState({ [name]: value });
						}}
						isValid={this.state.valid !== this.state.email}
						valid={this.state.valid}
						delete={() => this.props.delete(this.state.id)}
						cancelDelete={this.props.cancelDelete}
					/>
				)}
				{this.props.logout && (
					<LogoutAllModal
						cancelLogout={this.props.cancelLogout}
						logout={this.props.logoutAll}
						closeBackdrop={this.props.cancelLogout}
					/>
				)}
				<div
					className='float-right'
					style={{
						border: 'double 4px #75D701',
						padding: '5rem',
						boxShadow: '3px 5px 5px rgba(0,0,0,.4)',
						'@media (max-width:610px)': {
							padding: '3rem'
						},
						'@media (max-width:575px)': {
							padding: '2.5rem',
							float: 'none',
							width: '90vw',
							marginBottom: '2rem'
						},
						'@media (max-width:430px)': {
							padding: '1.75rem'
						}
					}}>
					<h2
						className='lead display-1 '
						style={{
							'@media (max-width:610px)': {
								fontSize: '3rem',
								fontWeight: '500'
							}
						}}>
						{username}
					</h2>
					<p
						style={{
							fontSize: '2.5rem',
							'@media (max-width:610px)': {
								fontSize: '2rem'
							}
						}}>
						<strong
							style={{
								fontSize: '1.8rem',
								color: '#56A902',
								'@media (max-width:610px)': {
									fontSize: '1.6rem'
								}
							}}>
							Location: &nbsp;
						</strong>
						{location.toUpperCase()}
					</p>
					<p
						style={{
							fontSize: '2.5rem',
							'@media (max-width:610px)': {
								fontSize: '2rem'
							}
						}}>
						<strong
							style={{
								fontSize: '1.8rem',
								color: '#56A902',
								'@media (max-width:610px)': {
									fontSize: '1.6rem'
								}
							}}>
							Email: &nbsp;
						</strong>
						{email}
					</p>
					<Link
						to='/Change_Password'
						className='d-block text-dark'
						style={{
							fontSize: '1.8rem'
						}}>
						Change password
					</Link>{' '}
					<button
						onClick={() => this.props.toEdit()}
						className='btn btn-success'
						style={{
							fontSize: '1.5rem',
							marginRight: '.3rem',
							'@media (max-width:610px)': {
								fontSize: '1.3rem'
							}
						}}>
						Edit
					</button>
					<button
						onClick={id => this.props.toDelete()}
						className='btn btn-danger'
						style={{
							fontSize: '1.5rem',
							marginRight: '.3rem',
							'@media (max-width:610px)': {
								fontSize: '1.3rem'
							}
						}}>
						Delete
					</button>
					<button
						onClick={() => this.props.toLogoutAll()}
						className='btn btn-warning'
						style={{
							fontSize: '1.5rem',
							marginRight: '.3rem',
							'@media (max-width:610px)': {
								fontSize: '1.3rem'
							}
						}}>
						Logout All Sessions
					</button>
					{this.props.edit && (
						<button
							className='btn btn-dark'
							style={{
								fontSize: '1.5rem',
								'@media (max-width:610px)': {
									fontSize: '1.3rem'
								}
							}}
							onClick={() => this.props.cancel()}>
							Cancel
						</button>
					)}
					<Link to='/Home' className='nav-link'>
						{' '}
						&larr; Go back
					</Link>
				</div>
				{this.props.edit && (
					<form
						className='float-left'
						onSubmit={evt => {
							evt.preventDefault();
							const { id, username, location, email } = this.state;
							this.props.updateProfile(id, { username, location, email });
							this.setState({
								username: this.props.username,
								location: this.props.location,
								email: this.props.email
							});
						}}>
						<div>
							<input
								className='form-control'
								type='text'
								name='username'
								id='username'
								placeholder='username'
								onChange={this.changeHandler}
								value={this.state.username}
							/>
							<input
								className='form-control'
								type='email'
								name='email'
								id='email'
								placeholder='@email.com'
								onChange={this.changeHandler}
								value={this.state.email}
							/>

							<input
								type='text'
								name='location'
								id='location'
								placeholder='Location'
								className='form-control'
								value={this.state.location}
							/>
							<button type='submit' className='btn btn-success'>
								Update Profile
							</button>
						</div>
					</form>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	username: state.auth.user.username,
	email: state.auth.user.email,
	location: state.auth.user.location,
	id: state.auth.user._id,
	edit: state.auth.edit,
	logout: state.auth.logoutAll,
	deleteUser: state.auth.delete
});

const mapDispatchToProps = dispatch => ({
	toEdit: () => dispatch({ type: actionTypes.EDIT_PROFILE }),
	toLogoutAll: () => dispatch({ type: actionTypes.TO_LOGOUT_ALL }),
	toDelete: () => dispatch({ type: actionTypes.TO_DELETE_PROFILE }),
	delete: id => dispatch(actionCreators.deleteUserProfile(id)),
	toLogout: () => dispatch({ type: actionTypes.TO_LOGOUT_ALL }),
	logoutAll: () => dispatch(actionCreators.logoutAll()),
	updateProfile: (id, data) => dispatch(actionCreators.updateProfile(id, data)),
	cancel: () => dispatch({ type: actionTypes.UPDATE_PROFILE_FAIL }),
	cancelLogout: () => dispatch({ type: actionTypes.CANCEL_LOGOUT }),
	cancelDelete: () => dispatch({ type: actionTypes.CANCEL_DELETE })
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Radium(Profile));
