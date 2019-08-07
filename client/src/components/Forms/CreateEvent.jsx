import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Events/creators';
export class CreateEvent extends Component {
	state = {
		title: '',
		description: '',
		date: '',
		redirect: false
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	submitHandler = (data, evt) => {
		evt.preventDefault();
		this.props.createEvent(data);
		this.setState({ redirect: true });
	};
	render() {
		return (
			<div>
				{this.state.redirect ? (
					<Redirect to='/Home' />
				) : (
					<form
						onSubmit={this.submitHandler.bind(this, {
							title: this.state.title,
							description: this.state.description,
							date: this.state.date
						})}>
						<div className='form-group'>
							<input
								type='text'
								name='title'
								id='title'
								placeholder='Title of Event'
								className='form-control form-control-lg'
								value={this.state.title}
								onChange={this.changeHandler}
							/>
							<input
								type='date'
								name='date'
								id='date'
								className='form-control form-control-lg'
								placeholder='--/--/----'
								value={this.state.date}
								onChange={this.changeHandler}
							/>
							<textarea
								name='description'
								id='description'
								cols='30'
								rows='10'
								value={this.state.description}
								onChange={this.changeHandler}
							/>
							<button type='submit'>Submit</button>
						</div>
					</form>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	createEvent: data => dispatch(actionCreators.createEvent(data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateEvent);
