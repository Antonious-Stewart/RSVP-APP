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
	cancelHandler = id => {
		return this.props.cancel(id);
	};
	viewHandler = id => {
		this.props.viewEvent(id);
		this.setState({ redirect: true, id });
	};
	render() {
		if (this.props.loading) {
			this.props.getEvents();
		}
		return (
			<div>
				{this.state.redirect && <Redirect to={`/event/${this.state.id}`} />}
				{this.props.events.map(event => (
					<Events
						view={this.viewHandler.bind(this, event._id)}
						key={event._id}
						title={event.title}
						desc={event.description}
						cancel={this.cancelHandler.bind(this, event._id)}
						date={event.date}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.event.loading,
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
