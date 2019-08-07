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
		confirmPassword: ''
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
				confirmPassword: ''
			});
		} else {
			evt.preventDefault();
			return alert('check form');
		}
	};
	render() {
		return (
			<div>
				<SignUpForm
					submit={this.submitHandler.bind(this, this.state)}
					change={this.changeHandler}
					email={this.state.email}
					password={this.state.password}
					username={this.state.username}
					confirmEmail={this.state.confirmEmail}
					confirmPassword={this.state.confirmPassword}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	submitForm: result => dispatch(actionCreators.SignUp(result))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Landing);
