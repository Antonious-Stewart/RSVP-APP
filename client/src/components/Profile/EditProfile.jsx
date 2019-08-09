import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Auth/creators';

export class EditProfile extends Component {
	state = {
		username: this.props.user.username,
		email: this.props.user.email,
		newPassword: '',
		password: '',
		redirect: false
	};
	static propTypes = {
		auth: PropTypes.object.isRequired
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	submitHandler = (id, data, evt) => {
		evt.preventDefault();
		this.props.save(id, data);
		this.setState({
			username: '',
			email: '',
			redirect: true
		});
	};
	render() {
		const { username, email } = this.state;
		return (
			<Fragment>
				{this.state.redirect && <Redirect to='/Profile' />}

				<form
					onSubmit={this.submitHandler.bind(this, this.props.user._id, {
						username,
						email
					})}>
					<div>
						<input
							className='form-control form-control-lg'
							type='text'
							name='username'
							id='username'
							placeholder='username'
							onChange={this.changeHandler}
							value={this.state.username}
						/>
						<input
							className='form-control form-control-lg'
							type='email'
							name='email'
							id='email'
							placeholder='@email.com'
							onChange={this.changeHandler}
							value={this.state.email}
						/>
						<button type='submit'>Save</button>
					</div>
				</form>
			</Fragment>
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
)(EditProfile);
