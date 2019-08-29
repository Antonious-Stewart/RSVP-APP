import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import * as actionCreators from '../../store/actions/Events/creators';
import EditEvent from './EditEvent';
import DeleteEventModal from '../Modals/DeleteEventModal';
import Alert from '../Alerts/Alert';

export class SelectedEvent extends Component {
	static propTypes = {
		event: PropTypes.array.isRequired,
		editEvent: PropTypes.func,
		cancel: PropTypes.func,
		deleteEvent: PropTypes.func,
		toDelete: PropTypes.func,
		cancelDelete: PropTypes.func
	};
	cancelHandler = id => {
		this.props.cancel(id);
		this.props.history.goBack();
	};

	render() {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '3rem 0 9rem 0',
					minHeight: '100vh'
				}}>
				<Alert />
				{this.props.delete && (
					<DeleteEventModal
						cancelDelete={() => {
							this.props.cancelDelete();
						}}
						delete={() => {
							this.props.deleteEvent(this.props.event[0]._id);
							this.props.history.push('/');
						}}
					/>
				)}
				{this.props.edit ? (
					<EditEvent />
				) : (
					this.props.event.map((evt, i) => (
						<div
							key={i}
							style={{
								width: '80rem',
								boxShadow: '0 0 4px rgba(0,0,0,.5)',
								padding: '2.5rem'
							}}>
							<h3
								className='text-success'
								style={{
									fontSize: '4.5rem',
									fontFamily: 'Lobster Two, cursive'
								}}>
								{evt.title}
							</h3>
							<p style={{ fontSize: '1.4rem' }}>
								<strong
									className='text-success'
									style={{
										fontSize: '1.8rem',
										fontFamily: 'Lobster Two, cursive'
									}}>
									Location:
								</strong>
								{evt.location}
							</p>
							<p style={{ fontSize: '1.4rem' }}>
								<strong
									className='text-success'
									style={{
										fontSize: '1.8rem',
										fontFamily: 'Lobster Two, cursive'
									}}>
									Date:
								</strong>
								<Moment date={evt.date} format='LLLL' />
							</p>
							<p
								style={{
									border: 'double 4px green',
									padding: '1.5rem',
									fontSize: '1.5rem',
									overflow: 'auto',
									height: '60%'
								}}>
								{evt.description}
							</p>
							<ul>
								<strong
									className='text-success'
									style={{
										fontSize: '1.8rem',
										fontFamily: 'Lobster Two, cursive'
									}}>
									Attending:
								</strong>
								{evt.rsvps.map((rsvp, i) => (
									<li key={i} style={{ fontSize: '1.4rem' }}>
										{rsvp} ,
									</li>
								))}
							</ul>
							<footer style={{ fontSize: '1.4rem' }}>
								<strong
									className='text-success'
									style={{
										fontSize: '1.8rem',
										fontFamily: 'Lobster Two, cursive'
									}}>
									organizer:
								</strong>
								{evt.organizer.username}
							</footer>
							<button
								onClick={this.cancelHandler.bind(this, evt._id)}
								className='btn btn-dark'
								style={{
									fontSize: '1.6rem',
									marginRight: '.3rem',
									fontFamily: 'Lobster Two, cursive'
								}}>
								Cancel Rsvp
							</button>

							{Object.is(evt.organizer._id, this.props.user) && (
								<button
									onClick={() => this.props.editEvent()}
									className='btn btn-success'
									style={{
										fontSize: '1.6rem',
										marginRight: '.3rem',
										fontFamily: 'Lobster Two, cursive'
									}}>
									Edit
								</button>
							)}
							{Object.is(evt.organizer._id, this.props.user) && (
								<button
									onClick={() => this.props.toDelete()}
									className='btn btn-danger'
									style={{
										fontSize: '1.6rem',
										fontFamily: 'Lobster Two, cursive'
									}}>
									Delete
								</button>
							)}
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
					))
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	event: state.event.selectedEvent,
	delete: state.event.delete,
	edit: state.event.edit,
	user: state.auth.user._id
});

const mapDispatchToProps = dispatch => ({
	cancel: id => dispatch(actionCreators.cancelRsvp(id)),
	editEvent: () => dispatch(actionCreators.edit()),
	toDelete: () => dispatch(actionCreators.toDelete()),
	cancelDelete: () => dispatch(actionCreators.cancelDelete()),
	deleteEvent: id => dispatch(actionCreators.deleteEvent(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(SelectedEvent));
