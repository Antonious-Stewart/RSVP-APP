import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Events/creators';
import Radium from 'radium';
export class CreateEvent extends Component {
	state = {
		title: '',
		description: '',
		date: '',
		location: ''
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	submitHandler = (data, evt) => {
		evt.preventDefault();
		this.props.createEvent(data);
		this.props.history.push('/');
	};
	render() {
		const { title, description, date, location } = this.state;
		return (
			<div
				style={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '3rem 0 9rem 0'
				}}>
				<form
					style={{
						fontSize: '1.6rem',
						width: '85vw',
						border: 'double 4px black',
						padding: '2rem',
						boxShadow: '-2px 5px 3px rgba(0,0,0,.4)'
					}}
					onSubmit={this.submitHandler.bind(this, {
						title,
						description,
						date,
						location
					})}>
					<div className='form-group'>
						<label
							htmlFor='title'
							className='text-success'
							style={{ fontFamily: 'Lobster Two' }}>
							Title
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
						<label
							htmlFor='location'
							className='text-success'
							style={{ fontFamily: 'Lobster Two' }}>
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
						<label
							htmlFor='date'
							className='text-success'
							style={{ fontFamily: 'Lobster Two' }}>
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
						<label
							htmlFor='description'
							className='text-success'
							style={{ fontFamily: 'Lobster Two' }}>
							Description of the Event
						</label>
						<textarea
							style={{ marginBottom: '.3rem' }}
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
							style={{ fontSize: '1.6rem', fontFamily: 'Lobster Two' }}>
							Submit
						</button>
						<button
							className='d-block btn btn-light mt-2 text-primary'
							style={{
								fontSize: '1.3rem',
								fontFamily: 'Lobster Two, cursive'
							}}
							onClick={() => this.props.history.goBack()}>
							Go back
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	createEvent: data => dispatch(actionCreators.createEvent(data))
});
CreateEvent = Radium(CreateEvent);
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CreateEvent));
