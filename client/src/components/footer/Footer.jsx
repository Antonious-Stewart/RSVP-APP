import React, { Component } from 'react';
import * as Bootstrap from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
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
						<Link
							className='nav-link text-white'
							to='https://github.com/Antonious-Stewart'>
							Github
						</Link>
					</li>
					<li className='nav-item'>
						<NavLink
							href='https://www.linkedin/in/antonious-stewart'
							className='nav-link text-white'
							to='https://www.linkedin/in/antonious-stewart'>
							Linkedin
						</NavLink>
					</li>
					<li className='nav-item text-white '>Antonious Stewart</li>
				</Bootstrap.Nav>
			</footer>
		);
	}
}
