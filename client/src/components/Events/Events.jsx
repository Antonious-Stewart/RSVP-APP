import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Events extends Component {
	render() {
		Events.propTypes = {
			img: PropTypes.string,
			organizer: PropTypes.string,
			title: PropTypes.string,
			desc: PropTypes.string,
			view: PropTypes.func
		};

		return (
			<div onClick={this.props.view}>
				<h3>{this.props.title}</h3>
				<img src={this.props.img} alt='img of event' />
				<p>
					<strong>Description</strong>:{this.props.desc}
				</p>
				<div>
					<strong>Attending</strong>:
				</div>
				<footer>
					<strong>Organizer</strong>:{this.props.organizer}
				</footer>
			</div>
		);
	}
}
