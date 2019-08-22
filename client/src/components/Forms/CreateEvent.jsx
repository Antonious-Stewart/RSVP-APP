import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Events/creators';
import Radium from 'radium';
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
			<div
				style={{
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}>
				{this.state.redirect ? (
					<Redirect to='/Home' />
				) : (
					<form
						style={{
							fontSize: '1.4rem',
							width: '50vw',
							border: 'double 4px black',
							padding: '2rem',
							boxShadow: '-2px 5px 3px rgba(0,0,0,.4)',
							'@media (max-width: 740px)': {
								width: '50rem'
							},
							'@media (max-width: 630px)': {
								width: '40rem'
							},
							'@media (max-width: 500px)': {
								width: '30rem'
							},
							'@media (max-width: 340px)': {
								width: '25rem'
							}
						}}
						onSubmit={this.submitHandler.bind(this, {
							title,
							description,
							date,
							location
						})}>
						<div className='form-group'>
							<label htmlFor='title' className='text-success'>
								Title:
							</label>
							<input
								type='text'
								name='title'
								id='title'
								placeholder='Johns Bar B que'
								className='form-control form-control-lg'
								value={this.state.title}
								onChange={this.changeHandler}
								required
							/>
							<label htmlFor='location' className='text-success'>
								Event Location
							</label>
							<input
								type='text'
								name='location'
								id='location'
								placeholder='Your house'
								className='form-control form-control-lg'
								value={this.state.location}
								onChange={this.changeHandler}
								required
							/>
							<label htmlFor='date' className='text-success'>
								Date
							</label>
							<input
								type='datetime-local'
								name='date'
								id='date'
								className='form-control form-control-lg'
								placeholder='--/--/----'
								value={this.state.date}
								onChange={this.changeHandler}
								required
							/>
							<label htmlFor='description' className='text-success'>
								Description of the Event
							</label>
							<textarea
								name='description'
								id='description'
								cols='30'
								rows='10'
								className='form-control form-control-lg'
								placeholder="We got chicken, we got games we got burgers no bun and hotdogs with chili. We have the fun if you bring the games. Did I mention we're all out of drinks?"
								value={this.state.description}
								onChange={this.changeHandler}
							/>
							<button
								type='submit'
								className='btn btn-block btn-success'
								style={{ fontSize: '1.2rem' }}>
								Submit
							</button>
							<Link to='/Home' className='nav-link'>
								Go back
							</Link>
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
)(Radium(CreateEvent));
