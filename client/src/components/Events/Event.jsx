import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Events from './Events';

export class Event extends Component {
	static propTypes = {
		prop: PropTypes
	};

	render() {
		return (
			<div>
				{!this.props.loading &&
					this.props.events.map(event => (
						<Events
							view={this.ViewEventHandler}
							key={event._id}
							organizer={event.organizer}
							desc={event.desctiption}
							title={event.title}
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
	view: () => dispatch()
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Event);
