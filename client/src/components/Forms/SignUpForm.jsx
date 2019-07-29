import React, { Component } from 'react';
import SignUpButton from '../Buttons/SignUpButton';

export default class SignUpForm extends Component {
	state = {
		username: '',
		password: '',
		email: '',
		confirmEmail: '',
		confirmPassword: ''
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	submitHandler = (data, evt) => {
		evt.preventDefault();
		this.setState({
			username: '',
			password: '',
			email: '',
			confirmEmail: '',
			confirmPassword: ''
		});
	};
	render() {
		return (
			<form data-test='app-signup-form'>
				<div className='form-group'>
					<input
						type='text'
						name='username'
						id='username'
						placeholder='username'
						value={this.state.username}
						className='form-control form-control-lg'
					/>
					<input
						type='text'
						name='email'
						id='email'
						placeholder='@email.com'
						value={this.state.email}
						className='form-control form-control-lg'
					/>
					<input
						type='text'
						name='confirmEmail'
						id='confirmEmail'
						placeholder='@email.com'
						value={this.state.confirmEmail}
						className='form-control form-control-lg'
					/>
					<input
						type='text'
						name='password'
						id='password'
						placeholder='password'
						value={this.state.password}
						className='form-control form-control-lg'
					/>
					<input
						type='text'
						name='confirmPassword'
						id='confirmPassword'
						placeholder='password'
						value={this.state.confirmPassword}
						className='form-control form-control-lg'
					/>
				</div>
				<SignUpButton signUp={this.submitHandler.bind(this, this.state)} />
			</form>
		);
	}
}
