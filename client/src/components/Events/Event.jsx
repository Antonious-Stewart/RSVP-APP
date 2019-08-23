import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';

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
			<div>
				<div style={eventStyles}>
					{this.state.redirect && <Redirect to={`/event/${this.state.id}`} />}
					{this.props.loading ? (
						<div className='spinner-grow' />
					) : this.props.events.length !== 0 ? (
						this.props.events.map(event => (
							<Events
								view={() => {
									this.props.viewEvent(event._id);

									this.setState({
										redirect: true,
										id: event._id
									});
								}}
								reserve={() => this.props.reserve(event._id)}
								location={event.location}
								key={event._id}
								title={event.title}
								attending={
									this.props.user.attending.includes(event.title) || false
								}
								desc={event.description}
								cancel={() => this.props.cancel(event._id)}
								date={event.date}
							/>
						))
					) : (
						<div
							style={{
								height: '35rem',
								width: '30rem',
								borderRadius: '1.1rem',
								boxShadow: '0 0 4px rgba(0,0,0,.4)',
								textAlign: 'center',
								padding: '1rem 1.5rem',
								fontSize: '3rem',
								letterSpacing: '2px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center	',
								flexDirection: 'column',
								fontFamily: 'Lobster Two'
							}}>
							Create Event
							<Link to='/Create_Event'>
								{' '}
								<ion-icon
									name='add-circle'
									style={{ color: 'green', fontSize: '20rem' }}
								/>
							</Link>
						</div>
					)}
				</div>
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
	viewEvent: id => dispatch(actionCreators.viewEvent(id)),
	reserve: id => dispatch(actionCreators.rsvp(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Radium(Event));
