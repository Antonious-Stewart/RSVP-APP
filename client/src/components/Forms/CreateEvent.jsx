import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Events/creators';
export class CreateEvent extends Component {
	state = {
		title: '',
		description: '',
		date: '',
		location: '',
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
		const { title, description, date, location } = this.state;
		return (
			<div>
				{this.state.redirect ? (
					<Redirect to='/Home' />
				) : (
					<form
						onSubmit={this.submitHandler.bind(this, {
							title,
							description,
							date,
							location
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
								required
							/>
							<input
								type='text'
								name='location'
								id='loacation'
								placeholder='Address of event'
								className='form-control form-control-lg'
								value={this.state.location}
								onChange={this.changeHandler}
								required
							/>
							<input
								type='date'
								name='date'
								id='date'
								className='form-control form-control-lg'
								placeholder='--/--/----'
								value={this.state.date}
								onChange={this.changeHandler}
								required
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
