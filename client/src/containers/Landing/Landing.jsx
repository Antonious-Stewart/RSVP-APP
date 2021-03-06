import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import SignUpForm from '../../components/Forms/SignUpForm';
import * as actionCreators from '../../store/actions/Auth/creators';
import './Landing.css';
import { setAlert } from '../../store/actions/Alerts/creators';
import Alert from '../../components/Alerts/Alert';
class Landing extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		confirmEmail: '',
		confirmPassword: '',
		location: ''
	};

	static propTypes = {
		submit: PropTypes.func
	};

	changeHandler = evt => {
		const { name, value } = evt.target;

		this.setState({
			[name]: value
		});
	};

	submitHandler = (data, evt) => {
		const { password, confirmEmail, confirmPassword, email } = this.state;
		if (password !== confirmPassword) {
			evt.preventDefault();
			this.setState({ password: '', confirmPassword: '' });
			return this.props.setAlert('Passwords do not match', 'warning');
		} else if (email !== confirmEmail) {
			evt.preventDefault();
			this.setState({ email: '', confirmEmail: '' });
			return this.props.setAlert('Email does not match', 'warning');
		} else {
			evt.preventDefault();
			this.props.submitForm(data);
			this.setState({
				username: '',
				password: '',
				email: '',
				confirmEmail: '',
				confirmPassword: '',
				location: ''
			});
		}
	};

	render() {
		const {
			username,
			confirmEmail,
			confirmPassword,
			password,
			email,
			location
		} = this.state;

		const headingStyles = {
			fontSize: '8.6rem',
			fontFamily: 'Lobster Two' || 'cursive',
			display: 'inline-block',
			backgroundImage: 'linear-gradient(105deg, #3B4E32, #75D701)',
			WebkitBackgroundClip: 'text',
			backgroundClip: 'text',
			color: 'transparent',
			position: 'absolute',
			top: '15%',
			right: 'calc(100vw - 80%)',
			'@media (max-width: 1030px)': {
				fontSize: '7.8rem'
			},
			'@media (max-width: 955px)': {
				fontSize: '7.2rem'
			},
			'@media (max-width: 890px)': {
				fontSize: '6.8rem'
			},
			'@media (max-width: 800px)': {
				fontSize: '6.5rem',
				right: 'calc(100vw - 90%)'
			}
		};

		return (
			<div style={{ height: '100vh' }}>
				<Alert />
				<h1 style={headingStyles}> ReserveIT </h1>
				<div className='img-banner' />
				<SignUpForm
					submit={this.submitHandler.bind(this, this.state)}
					change={this.changeHandler}
					email={email}
					password={password}
					username={username}
					confirmEmail={confirmEmail}
					confirmPassword={confirmPassword}
					location={location}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	submitForm: result => dispatch(actionCreators.SignUp(result)),
	setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType))
});

Landing = Radium(Landing);

export default connect(
	null,
	mapDispatchToProps
)(Landing);
