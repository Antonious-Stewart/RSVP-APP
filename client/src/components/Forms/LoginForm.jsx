import React, { Component } from 'react';
import LoginButton from '../Buttons/LoginButton';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
	static propTypes = {
		email: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
		submit: PropTypes.func,
		change: PropTypes.func
	};
	render() {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '86.5vh'
				}}>
				<form
					data-test='app-login-form'
					onSubmit={this.props.submit}
					style={{ width: '25rem' }}>
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
						type='password'
						name='password'
						id='password'
						placeholder='**********'
						value={this.props.password}
						onChange={this.props.change}
						className='form-control form-control-lg'
					/>
					<LoginButton />
				</form>
			</div>
		);
	}
}
