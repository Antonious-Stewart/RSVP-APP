import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUpForm from '../../components/Forms/SignUpForm';
import * as actionCreators from '../../store/actions/Auth/creators';

export class Landing extends Component {
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
		this.setState({ [name]: value });
	};
	submitHandler = (data, evt) => {
		if (
			this.state.password === this.state.confirmPassword &&
			this.state.email === this.state.confirmEmail
		) {
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
		} else {
			evt.preventDefault();
			return alert('check form');
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
		return (
			<div>
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
	submitForm: result => dispatch(actionCreators.SignUp(result))
});

export default connect(
	null,
	mapDispatchToProps
)(Landing);
