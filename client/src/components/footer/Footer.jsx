import React, { Component } from 'react';
import * as Bootstrap from 'reactstrap';

export default class Footer extends Component {
	render() {
		return (
			<footer
				className='bg-success p-4'
				style={{
					width: '100%',
					fontSize: '1.3 rem',
					position: 'absolute',
					left: 0,
					bottom: 0,
					right: 0
				}}>
				<Bootstrap.Nav style={{ alignItems: 'center' }}>
					<li className='nav-item'>
						<a
							className='nav-link text-white'
							target='_blank'
							rel='noopener noreferrer'
							href='https://github.com/Antonious-Stewart'>
							Github
						</a>
					</li>
					<li className='nav-item'>
						<a
							target='_blank'
							rel='noopener noreferrer'
							href='https://www.linkedin/in/antonious-stewart'
							className='nav-link text-white'
							to='https://www.linkedin/in/antonious-stewart'>
							Linkedin
						</a>
					</li>
					<li className='nav-item text-white '>Antonious Stewart</li>
				</Bootstrap.Nav>
			</footer>
		);
	}
}
