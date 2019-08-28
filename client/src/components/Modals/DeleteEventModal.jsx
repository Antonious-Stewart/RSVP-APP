import React, { Component } from 'react';
import Radium from 'radium';
class DeleteEventModal extends Component {
	render() {
		return (
			<div>
				<div
					style={{
						height: '100vh',
						position: 'fixed',
						backgroundColor: 'rgba(0,0,0,.4)',
						width: '100%',
						top: 0,
						left: 0
					}}
					onClick={this.props.closeBackdrop}
				/>
				<div
					style={{
						position: 'fixed',
						backgroundColor: '#eee',
						height: '30rem',
						width: '60rem',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						borderRadius: '1rem',
						padding: '2rem 3rem',
						'@media (max-width:676px)': {
							width: '80vw',
							padding: '1rem 2rem'
						},
						'@media (max-width:596px)': {
							width: '90vw',
							height: '32rem'
						}
					}}>
					<h3
						style={{
							textAlign: 'center',
							textTransform: 'uppercase',
							borderBottom: 'double 4px red',
							paddingBottom: '1rem',
							fontSize: '2.4rem',
							fontWeight: 900,
							marginBottom: '1.5rem',
							'@media (max-width:596px)': {
								fontSize: '1.8rem'
							}
						}}>
						danger!!!
					</h3>
					<p
						style={{
							fontSize: '1.8rem',
							marginBottom: '2.2rem',
							'@media (max-width:596px)': {
								fontSize: '1.6rem'
							}
						}}>
						You are currently attempting to delete this event once deleted this
						cannot be undone this event will still show in users attendings
						sections be sure to give attendees time to cancel rsvps before
						removing.
					</p>
					<footer
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
						<button
							className='btn btn-danger'
							style={{
								fontSize: '1.6rem',
								'@media (max-width:596px)': {
									fontSize: '1.2rem'
								}
							}}
							onClick={this.props.delete}>
							Delete
						</button>
						<button
							className='btn btn-light'
							style={{
								fontSize: '1.6rem',
								'@media (max-width:596px)': {
									fontSize: '1.2rem'
								}
							}}
							onClick={this.props.cancelDelete}>
							Cancel
						</button>
					</footer>
				</div>
			</div>
		);
	}
}

export default Radium(DeleteEventModal);
