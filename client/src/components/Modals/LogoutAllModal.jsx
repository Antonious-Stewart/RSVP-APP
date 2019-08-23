import React, { Component } from 'react';
import Radium from 'radium';
class LogoutAllModal extends Component {
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
						height: '25rem',
						width: '50rem',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						borderRadius: '1rem',
						padding: '2rem 3rem',
						'@media (max-width:676px)': {
							width: '85vw',
							padding: '1rem 2rem'
						},
						'@media (max-width:596px)': {
							width: '78vw',
							height: '23rem'
						},
						'@media (max-width:430px)': {
							height: '29rem'
						}
					}}>
					<h3
						style={{
							textAlign: 'center',
							textTransform: 'uppercase',
							borderBottom: 'double 4px orange',
							paddingBottom: '1rem',
							fontSize: '2.4rem',
							fontWeight: 900,
							marginBottom: '1.5rem',
							'@media (max-width:596px)': {
								fontSize: '1.8rem'
							}
						}}>
						warning!!!
					</h3>
					<p
						style={{
							fontSize: '1.8rem',
							marginBottom: '3rem',
							'@media (max-width:596px)': {
								fontSize: '1.6rem'
							}
						}}>
						You are currently attempting to logout of all sessions associated
						with this user to continue with this process click logout. If you DO
						NOT wish to procced click cancel.
					</p>
					<footer
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
						<button
							className='btn btn-primary'
							style={{
								fontSize: '1.6rem',
								'@media (max-width:676px)': {
									fontSize: '1.2rem'
								}
							}}
							onClick={this.props.logout}>
							Logout
						</button>
						<button
							className='btn btn-light'
							style={{
								fontSize: '1.6rem',
								'@media (max-width:676px)': {
									fontSize: '1.2rem'
								}
							}}
							onClick={this.props.cancelLogout}>
							Cancel
						</button>
					</footer>
				</div>
			</div>
		);
	}
}

export default Radium(LogoutAllModal);
