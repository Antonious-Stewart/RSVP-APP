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
			attending: PropTypes.bool
		};
		const eventsStyles = {
			padding: '1.25rem 2rem',
			marginRight: '2rem',
			marginBottom: '3rem',
			flex: '1 1 45rem',
			boxShadow: '0 0 3px rgba(0,0,0,.6)',
			borderRadius: '2rem',
			fontSize: '1.4rem'
		};
		const { title, desc, date, location, attending } = this.props;
		return (
			<div style={eventsStyles}>
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
						Date
					</strong>
					:{date}
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
