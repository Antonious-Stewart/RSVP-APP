import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actionCreators from '../../store/actions/Auth/creators';
export class ChangePassword extends Component {
	state = {
		password: '',
		confirmPassword: '',
		redirect: false
	};
	static propTypes = {
		user: PropTypes.object.isRequired
	};
	submitHandler = (id, data, evt) => {
		evt.preventDefault();
		this.props.save(id, data);
		this.setState({
			password: '',
			confirmPassword: '',
			redirect: true
		});
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	render() {
		const { password } = this.state;
		return (
			<div>
				{this.state.redirect && <Redirect to='/Profile' />}
				<form
					onSubmit={this.submitHandler.bind(this, this.props.user._id, {
						password
					})}>
					<div className='form-group'>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='New Password'
							onChange={this.changeHandler}
							value={this.state.password}
							required
						/>
						<input
							type='password'
							name='confirmPassword'
							id='confimrPassword'
							placeholder='confirm New Password'
							onChange={this.changeHandler}
							value={this.state.confirmPassword}
							required
						/>
					</div>
					<button type='submit'>Save</button>
					<button onClick={() => this.setState({ redirect: true })}>
						Cancel
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	save: (id, data) => dispatch(actionCreators.saveProfile(id, data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePassword);
