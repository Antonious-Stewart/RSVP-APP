import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUpButton from '../Buttons/SignUpButton';

export default class SignUpForm extends Component {
	static propTypes = {
		submit: PropTypes.func,
		email: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		confirmEmail: PropTypes.string.isRequired,
		confirmPassword: PropTypes.string.isRequired,
		location: PropTypes.string
	};
	render() {
		return (
			<form data-test='app-signup-form' onSubmit={this.props.submit}>
				<div className='form-group'>
					<input
						type='text'
						name='username'
						id='username'
						placeholder='username'
						value={this.props.username}
						onChange={this.props.change}
						className='form-control form-control-lg'
					/>
					<input
						type='text'
						name='email'
						id='email'
						placeholder='@email.com'
						value={this.props.email}
						onChange={this.props.change}
						className='form-control form-control-lg'
					/>
					<input
						type='text'
						name='confirmEmail'
						id='confirmEmail'
						placeholder='@email.com'
						value={this.props.confirmEmail}
						onChange={this.props.change}
						className='form-control form-control-lg'
					/>
					<input
						type='text'
						name='password'
						id='password'
						placeholder='password'
						value={this.props.password}
						onChange={this.props.change}
						className='form-control form-control-lg'
					/>
					<input
						type='text'
						name='confirmPassword'
						id='confirmPassword'
						placeholder='password'
						value={this.props.confirmPassword}
						onChange={this.props.change}
						className='form-control form-control-lg'
					/>
					<input
						type='text'
						name='location'
						id='location'
						placeholder='Location'
						value={this.props.location}
						onChange={this.props.change}
						className='form-control form-control-lg'
					/>
				</div>
				<SignUpButton />
			</form>
		);
	}
}
