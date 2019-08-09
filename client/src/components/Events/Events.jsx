import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Events extends Component {
	render() {
		Events.propTypes = {
			img: PropTypes.string,
			organizer: PropTypes.string,
			title: PropTypes.string,
			desc: PropTypes.string,
			view: PropTypes.func,
			attending: PropTypes.number
		};
		const { title, desc, date } = this.props;
		return (
			<div>
				<h3>{title}</h3>
				<img src={this.props.img} alt='img of event' />
				<p>
					<strong>Description</strong>:{desc}
				</p>
				<div>
					<strong>Date</strong>:{date.replace('T00:00:00.000Z', '')}
				</div>
				<button onClick={this.props.view}>View</button>
				<button onClick={this.props.cancel}>Cancel Rsvp</button>
			</div>
		);
	}
}
