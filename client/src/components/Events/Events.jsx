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

		return (
			<div>
				<h3>{this.props.title}</h3>
				<img src={this.props.img} alt='img of event' />
				<p>
					<strong>Description</strong>:{this.props.desc}
				</p>
				<div>
					<strong>Attending</strong>:{this.props.attending}
				</div>
				<button onClick={this.props.view}>View</button>
				<button onClick={this.props.cancel}>Cancel Rsvp</button>
			</div>
		);
	}
}
