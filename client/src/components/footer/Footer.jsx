import React, { Component } from 'react';
import * as Bootstrap from 'reactstrap';
import { Link } from 'react-router-dom';
export default class Footer extends Component {
	render() {
		return (
			<footer
				className='bg-success p-4'
				style={{ width: '100%', fontSize: '1.3 rem' }}>
				<Bootstrap.Nav style={{ alignItems: 'center' }}>
					<li className='nav-item float-right'>
						<Link className='nav-link text-white' to='/About'>
							About
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link text-white' to='#twitter'>
							Twitter
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link text-white' to='#linkedin'>
							Linkedin
						</Link>
					</li>
					<li className='nav-item text-white '>Antonious Stewart</li>
				</Bootstrap.Nav>
			</footer>
		);
	}
}
