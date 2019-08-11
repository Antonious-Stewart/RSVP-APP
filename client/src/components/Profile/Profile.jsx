import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Auth/creators';
export class Profile extends Component {
	state = { edit: this.props.edit };
	static propTypes = {
		auth: PropTypes.object.isRequired
	};

	render() {
		const { username, email, attending, _id, location } = this.props.user;
		return (
			<div>
				{this.state.edit && <Redirect to={`Profile/${_id}/edit`} />}
				<div>
					<button onClick={() => this.setState({ edit: true })}>Edit</button>
					<button onClick={id => this.props.delete(_id)}>Delete</button>
					<button onClick={() => this.props.logoutAll()}>
						Logout All Sessions
					</button>
					<h2>{username}</h2>
					<p>
						<strong>Location:</strong>
						{location}
					</p>
					<p>
						<strong>Email:</strong>
						{email}
					</p>
					<Link to='/Change_Password' className='nav-link'>
						Change password
					</Link>
					<ul>
						<h4>Attending:</h4>
						{attending.map((attendee, i) => (
							<li key={i}>{attendee} </li>
						))}
					</ul>
				</div>
				<Link to='/Home'>Go back</Link>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	edit: state.auth.edit
});

const mapDispatchToProps = dispatch => ({
	delete: id => dispatch(actionCreators.deleteUserProfile(id)),
	logoutAll: () => dispatch(actionCreators.logoutAll())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
