import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Radium from 'radium';
import Events from './Events';
import * as actionCreators from '../../store/actions/Events/creators';
import setAuthToken from '../../Utils/setAuthToken';

export class Event extends Component {
	state = {
		redirect: false,
		id: ''
	};

	componentDidMount() {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		if (this.props.fetchUserEvents) {
			this.props.getEvents();
		}
	}

	render() {
		const eventStyles = {
			display: 'flex',
			padding: '2rem 2.5rem',
			flexWrap: 'wrap'
		};

		return (
			<div style={eventStyles}>
				{' '}
				{this.state.redirect && <Redirect to={`/event/${this.state.id}`} />}
				{this.props.loading ? (
					<div className='spinner-grow' />
				) : (
					this.props.events.map(event => (
						<Events
							view={() => {
								this.props.viewEvent(event._id);

								this.setState({
									redirect: true,
									id: event._id
								});
							}}
							location={event.location}
							key={event._id}
							title={event.title}
							attending={event.rsvps.includes(this.props.user.email) || false}
							desc={event.description}
							cancel={() => this.props.cancel(event._id)}
							date={event.date}
						/>
					))
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	loading: state.event.loading,
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
)(Radium(Event));
