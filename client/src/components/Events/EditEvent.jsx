import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/Events/creators';

export class EditEvent extends Component {
	state = {
		title: this.props.event.title,
		description: this.props.event.description,
		img: this.props.event.img,
		location: this.props.event.location,
		date: this.props.event.date
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	static propTypes = {
		event: PropTypes.array.isRequired
	};

	render() {
		const { title, description, location, date } = this.state;
		return (
			<div
				style={{
					display: 'flex',
					height: '100vh',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '2rem'
				}}>
				<form
					style={{
						padding: '1.5rem',
						boxShadow: '0 0 4px rgba(0,0,0,.4)',
						fontSize: '1.4rem',
						width: '60rem'
					}}
					action='POST'
					onSubmit={evt => {
						evt.preventDefault();
						this.props.saveEvent(this.props.event._id, this.state);
						this.setState({
							title: '',
							description: '',
							location: '',
							date: ''
						});
					}}>
					<div className='form-group'>
						<label
							htmlFor='title'
							className='text-success'
							style={{ fontSize: '1.6rem' }}>
							Title
						</label>
						<input
							type='text'
							name='title'
							id='title'
							placeholder='title'
							value={title}
							onChange={this.changeHandler}
							className='form-control form-control-lg mb-2'
						/>
						<label
							htmlFor='location'
							className='text-success'
							style={{ fontSize: '1.6rem' }}>
							Location
						</label>
						<input
							type='text'
							name='location'
							id='location'
							placeholder='location '
							onChange={this.changeHandler}
							value={location}
							className='form-control form-control-lg mb-2'
						/>
						<label
							htmlFor='date'
							className='text-success'
							style={{ fontSize: '1.6rem' }}>
							Date
						</label>
						<input
							type='datetime-local'
							name='date'
							id='date'
							placeholder='mm/dd/yyyy'
							value={date}
							onChange={this.changeHandler}
							className='form-control form-control-lg mb-2'
						/>
						<label
							htmlFor='description'
							className='text-success'
							style={{ fontSize: '1.6rem' }}>
							Description
						</label>
						<textarea
							name='description'
							id='description'
							cols='30'
							rows='10'
							placeholder='Description'
							value={description}
							onChange={this.changeHandler}
							className='form-control form-control-lg mb-2'
						/>
					</div>
					<button
						className='btn btn-block mt-2 mb-2 btn-success'
						style={{ fontSize: '1.5rem', fontFamily: 'Lobster Two' }}>
						Save
					</button>
					<button
						style={{ fontSize: '1.5rem' }}
						className='btn btn-light'
						onClick={() => this.props.cancelEdit()}>
						cancel
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	event: state.event.selectedEvent[0]
});

const mapDispatchToProps = dispatch => ({
	cancelEdit: () => dispatch(actionCreators.saveEventFail()),
	saveEvent: (id, data) => dispatch(actionCreators.editEvent(id, data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditEvent);
