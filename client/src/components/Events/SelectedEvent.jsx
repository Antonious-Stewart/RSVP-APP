import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/Events/creators';
import { Redirect, Link } from 'react-router-dom';
import EditEvent from './EditEvent';

export class SelectedEvent extends Component {
	state = {
		redirect: false
	};
	static propTypes = {
		event: PropTypes.array.isRequired,
		cancel: PropTypes.func
	};
	cancelHandler = id => {
		this.props.cancel(id);
		this.setState({ redirect: true });
	};

	render() {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '3rem',
					height: '100vh'
				}}>
				{this.state.redirect && <Redirect to='/Home' />}
				{this.props.edit ? (
					<EditEvent />
				) : (
					this.props.event.map((evt, i) => (
						<div
							key={i}
							style={{
								width: '80rem',
								height: '100%',
								boxShadow: '0 0 4px rgba(0,0,0,.5)',
								padding: '2.5rem'
							}}>
							<h3>{evt.title}</h3>
							<p style={{ fontSize: '1.4rem' }}>
								<strong style={{ fontSize: '1.6rem' }}>Location:</strong>
								{evt.location}
							</p>
							<p style={{ fontSize: '1.4rem' }}>
								<strong style={{ fontSize: '1.6rem' }}>Date:</strong>
								{evt.date}
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
								<strong style={{ fontSize: '1.6rem' }}>Attending:</strong>
								{evt.rsvps.map((rsvp, i) => (
									<li key={i} style={{ fontSize: '1.4rem' }}>
										{rsvp} ,
									</li>
								))}
							</ul>
							<footer style={{ fontSize: '1.4rem' }}>
								<strong style={{ fontSize: '1.6rem' }}>organizer:</strong>
								{evt.organizer.username}
							</footer>
							<button
								onClick={this.cancelHandler.bind(this, evt._id)}
								className='btn btn-light'
								style={{ fontSize: '1.3rem', marginRight: '.3rem' }}>
								Cancel Rsvp
							</button>

							{Object.is(evt.organizer, this.props.user) && (
								<button
									onClick={() => this.props.editEvent()}
									className='btn btn-success'
									style={{ fontSize: '1.3rem', marginRight: '.3rem' }}>
									Edit
								</button>
							)}
							{Object.is(evt.organizer, this.props.user) && (
								<button
									onClick={() => this.props.deleteEvent(evt._id)}
									className='btn btn-danger'
									style={{ fontSize: '1.3rem' }}>
									Delete
								</button>
							)}
							<Link to='/Home' className='nav-link'>
								Go back
							</Link>
						</div>
					))
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	event: state.event.selectedEvent,
	edit: state.event.edit,
	user: state.auth.user._id
});

const mapDispatchToProps = dispatch => ({
	cancel: id => dispatch(actionCreators.cancelRsvp(id)),
	editEvent: () => dispatch(actionCreators.edit()),
	deleteEvent: id => dispatch(actionCreators.deleteEvent(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectedEvent);
