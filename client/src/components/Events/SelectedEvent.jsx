import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/Events/creators';
import { Redirect } from 'react-router-dom';
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
						<img src={evt.img} alt='img of event' />
						<p>
							<strong>Description</strong>:{evt.description}
						</p>
						<button onClick={this.cancelHandler.bind(this, evt._id)}>
							Cancel Rsvp
						</button>
						{evt.organizer && <button>Edit</button>}
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	event: state.event.selectedEvent
});

const mapDispatchToProps = dispatch => ({
	cancel: id => dispatch(actionCreators.cancelRsvp(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectedEvent);
