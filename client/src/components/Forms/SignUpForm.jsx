import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import SignUpButton from '../Buttons/SignUpButton';

class SignUpForm extends Component {
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
		const formStyles = {
			width: '30vw',
			position: 'absolute',
			top: '25%',
			right: '0',
			padding: '4rem',
			'@media (max-width:745px)': {
				width: '50vw'
			},
			'@media (max-width:600px)': {
				width: '70vw'
			},
			'@media (max-width:400px)': {
				width: '80vw'
			}
		};
		const labeStyles = { color: '#28a745', fontSize: '1.4rem' };
		return (
			<form
				id='Sign_up_form'
				data-test='app-signup-form'
				onSubmit={this.props.submit}
				style={formStyles}>
				<div className='form-group'>
					<label htmlFor='username' style={labeStyles}>
						Create A Username
					</label>
					<input
						type='text'
						name='username'
						id='username'
						placeholder='username'
						value={this.props.username}
						onChange={this.props.change}
						className='form-control'
					/>
					<label htmlFor='email' style={labeStyles}>
						Enter Your Email
					</label>
					<input
						type='text'
						name='email'
						id='email'
						placeholder='@email.com'
						value={this.props.email}
						onChange={this.props.change}
						className='form-control'
						required
					/>
					<label htmlFor='confirmEmail' style={labeStyles}>
						Confirm Email
					</label>
					<input
						type='text'
						name='confirmEmail'
						id='confirmEmail'
						placeholder='@email.com'
						value={this.props.confirmEmail}
						onChange={this.props.change}
						className='form-control'
						required
					/>
					<label htmlFor='password' style={labeStyles}>
						Create your password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='password'
						value={this.props.password}
						onChange={this.props.change}
						className='form-control '
						required
					/>
					<label htmlFor='confirmPassword' style={labeStyles}>
						Confirm your password
					</label>
					<input
						type='password'
						name='confirmPassword'
						id='confirmPassword'
						placeholder='password'
						value={this.props.confirmPassword}
						onChange={this.props.change}
						className='form-control '
						required
					/>
					<label htmlFor='location' style={labeStyles}>
						Where are you?
					</label>
					<input
						type='text'
						name='location'
						id='location'
						placeholder='Location'
						value={this.props.location}
						onChange={this.props.change}
						className='form-control '
					/>
				</div>
				<SignUpButton />
			</form>
		);
	}
}

SignUpForm = Radium(SignUpForm);
export default SignUpForm;
