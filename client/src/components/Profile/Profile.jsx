import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Auth/creators';
import Radium from 'radium';

export class Profile extends Component {
	state = {
		edit: this.props.edit,
		username: this.props.username,
		email: this.props.email,
		location: this.props.location,
		id: this.props.id
	};
	static propTypes = {
		auth: PropTypes.object.isRequired
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	render() {
		const { username, email, location } = this.state;
		const profileStyles = { height: '94.7vh', padding: '4rem' };
		return (
			<div style={profileStyles}>
				<div
					className='float-right'
					style={{
						border: 'double 4px #75D701',
						padding: '5rem',
						boxShadow: '3px 5px 5px rgba(0,0,0,.4)'
					}}>
					<h2 className='lead display-1 '>{username}</h2>
					<p style={{ fontSize: '2.5rem' }}>
						<strong style={{ fontSize: '1.8rem', color: '#56A902' }}>
							Location: &nbsp;
						</strong>
						{location}
					</p>
					<p style={{ fontSize: '2.5rem' }}>
						<strong style={{ fontSize: '1.8rem', color: '#56A902' }}>
							Email: &nbsp;
						</strong>
						{email}
					</p>
					<Link
						to='/Change_Password'
						className='nav-link text-dark'
						style={{ fontSize: '1.8rem' }}>
						Change password
					</Link>{' '}
					<button
						onClick={() => this.setState({ edit: true })}
						className='btn btn-success'
						style={{ fontSize: '1.5rem', marginRight: '.3rem' }}>
						Edit
					</button>
					<button
						onClick={id => this.props.delete(this.state.id)}
						className='btn btn-danger'
						style={{ fontSize: '1.5rem', marginRight: '.3rem' }}>
						Delete
					</button>
					<button
						onClick={() => this.props.logoutAll()}
						className='btn btn-dark'
						style={{ fontSize: '1.5rem' }}>
						Logout All Sessions
					</button>
					<Link to='/Home' className='nav-link'>
						{' '}
						&larr; Go back
					</Link>
				</div>
				{this.state.edit && (
					<form
						onSubmit={evt => {
							evt.preventDefault();
						}}>
						<div>
							<input
								className='form-control form-control-lg'
								type='text'
								name='username'
								id='username'
								placeholder='username'
								onChange={this.changeHandler}
								value={this.state.username}
							/>
							<input
								className='form-control form-control-lg'
								type='email'
								name='email'
								id='email'
								placeholder='@email.com'
								onChange={this.changeHandler}
								value={this.state.email}
							/>
							<input type='file' name='profileImg' id='profileImg' />
							<input
								type='text'
								name='loction'
								id='location'
								placeholder='Loaction'
								value={this.state.location}
							/>
							<button type='submit'>Save</button>
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
	edit: state.auth.edit
});

const mapDispatchToProps = dispatch => ({
	toEdit: () => dispatch(),
	toLogoutAll : () => dispatch(),
	delete: id => dispatch(actionCreators.deleteUserProfile(id)),
	logoutAll: () => dispatch(actionCreators.logoutAll())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
