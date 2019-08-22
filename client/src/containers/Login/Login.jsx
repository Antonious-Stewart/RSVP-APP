import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/Auth/creators';
import LoginForm from '../../components/Forms/LoginForm';
export class Login extends Component {
	state = {
		email: '',
		password: ''
	};
	static propTypes = {
		submit: PropTypes.func
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	submitHandler = (data, evt) => {
		evt.preventDefault();
		this.props.submit(data);
		this.setState({ email: '', password: '' });
	};
	render() {
		return (
			<div style={{ height: '100vh' }}>
				<LoginForm
					change={this.changeHandler}
					email={this.state.email}
					password={this.state.password}
					submit={this.submitHandler.bind(this, this.state)}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	submit: result => dispatch(actionCreators.login(result))
});

export default connect(
	null,
	mapDispatchToProps
)(Login);
