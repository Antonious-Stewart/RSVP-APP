import React, { Component } from 'react';
import LoginButton from '../Buttons/LoginButton';

export default class LoginForm extends Component {
	state = {
		name: '',
		password: ''
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	submitHandler = (data, evt) => {
		evt.preventDefault();
		this.setState({ name: '', password: '' });
	};
	render() {
		return (
			<form data-test='app-login-form'>
				<input
					type='text'
					name='name'
					id='name'
					className='form-control form-control-lg'
				/>
				<input
					type='text'
					name='password'
					id='password  '
					className='form-control form-control-lg'
				/>
				<LoginButton login={this.submitHandler.bind(this, this.state)} />
			</form>
		);
	}
}
