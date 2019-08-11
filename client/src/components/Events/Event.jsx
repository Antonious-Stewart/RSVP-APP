import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Events from './Events';
import * as actionCreators from '../../store/actions/Events/creators';

export class Event extends Component {
	state = {
		redirect: false,
		id: ''
	};
	render() {
		if (this.props.fetchUserEvents) {
			this.props.getEvents();
		}
		return (
			<div>
				{this.state.redirect && <Redirect to={`/event/${this.state.id}`} />}
				{this.props.events.map(event => (
					<Events
						view={() => {
							this.props.viewEvent(event._id);
							this.setState({ redirect: true, id: event._id });
						}}
						location={event.location}
						key={event._id}
						title={event.title}
						attending={event.rsvps.includes(this.props.user.email) || false}
						desc={event.description}
						cancel={() => this.props.cancel(event._id)}
						date={event.date}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	fetchUserEvents: state.event.fetchUserEvents,
	events: state.event.events
});

const mapDispatchToProps = dispatch => ({
	getEvents: () => dispatch(actionCreators.getEvents()),
	cancel: id => dispatch(actionCreators.cancelRsvp(id)),
	viewEvent: id => dispatch(actionCreators.viewEvent(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Event);
