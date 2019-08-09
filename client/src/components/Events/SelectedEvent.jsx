import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/Events/creators';
import { Redirect, Link } from 'react-router-dom';
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
			<div>
				{this.state.redirect && <Redirect to='/Home' />}
				{this.props.event.map((evt, i) => (
					<div key={i}>
						<h3>{evt.title}</h3>
						<p>
							<strong>Date:</strong>
							{evt.date.replace('T00:00:00.000Z', '')}
						</p>
						<img src={evt.img} alt='img of event' />
						<p>
							<strong>Description</strong>:{evt.description}
						</p>
						<ul>
							<strong>Attending:</strong>
							{evt.rsvps.map((rsvp, i) => (
								<li key={i}>{rsvp}</li>
							))}
						</ul>
						<footer>
							<strong>organizer:</strong>
							{evt.organizer.username}
						</footer>
						<button onClick={this.cancelHandler.bind(this, evt._id)}>
							Cancel Rsvp
						</button>

						{Object.is(evt.organizer._id, this.props.user) && (
							<button>Edit</button>
						)}
					</div>
				))}
				<Link to='/Home'>Go back</Link>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	event: state.event.selectedEvent,
	user: state.auth.user._id
});

const mapDispatchToProps = dispatch => ({
	cancel: id => dispatch(actionCreators.cancelRsvp(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectedEvent);
