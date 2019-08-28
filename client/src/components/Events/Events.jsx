import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
export default class Events extends Component {
	render() {
		Events.propTypes = {
			img: PropTypes.string,
			organizer: PropTypes.string,
			title: PropTypes.string,
			desc: PropTypes.string,
			view: PropTypes.func,
			attending: PropTypes.bool
		};
		const { title, desc, date, location, attending } = this.props;
		return (
			<div style={this.props.eventsStyles}>
				<h3
					className='lead display-4 text-success'
					style={{ fontFamily: 'Lobster Two' }}>
					{title}
				</h3>
				<h5
					style={{
						fontSize: '1.6rem',
						textTransform: 'capitalize'
					}}>
					<strong style={{ fontFamily: 'Lobster Two', fontSize: '1.6rem' }}>
						Location:
					</strong>
					{location}
				</h5>
				<p>
					<strong style={{ fontFamily: 'Lobster Two', fontSize: '1.6rem' }}>
						Description
					</strong>
					:{desc}
				</p>
				<div>
					<strong style={{ fontFamily: 'Lobster Two', fontSize: '1.6rem' }}>
						Date:
					</strong>
					<Moment date={date} format='LLLL' />
				</div>
				<button
					onClick={this.props.view}
					className='btn btn-light'
					style={{
						fontSize: '1.6rem',
						marginRight: '.25rem',
						fontFamily: 'Lobster Two'
					}}>
					View
				</button>
				{attending ? (
					<button
						onClick={this.props.cancel}
						className='btn btn-dark'
						style={{
							fontSize: '1.6rem',
							marginRight: '.25rem',
							fontFamily: 'Lobster Two'
						}}>
						Cancel
					</button>
				) : (
					<button
						onClick={this.props.reserve}
						className='btn btn-success'
						style={{ fontSize: '1.4rem', fontFamily: 'Lobster Two, cursive' }}>
						reservIt
					</button>
				)}
			</div>
		);
	}
}
