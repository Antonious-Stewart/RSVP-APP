import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Events from './Events';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Events/creators';
import Radium from 'radium';
export class SearchedEvents extends Component {
	constructor(props) {
		super(props);
		this.searchRef = React.createRef();
	}
	state = {
		query: '',
		redirect: false,
		id: ''
	};
	static propTypes = {
		search: PropTypes.bool,
		searchedEvents: PropTypes.array.isRequired
	};
	componentDidMount() {
		this.searchRef.current.focus();
	}

	render() {
		const headerStyles = {
			height: '94.7vh',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: '.8rem'
		};
		const searchStyles = {
			borderRadius: '2rem',
			border: 0,
			padding: '1rem',
			width: '30rem',
			':focus': {
				outline: 0,
				border: 0
			}
		};
		return (
			<div>
				{this.state.redirect && <Redirect to={`/event/${this.state.id}`} />}
				<header style={headerStyles}>
					<form
						method='get'
						onSubmit={async evt => {
							evt.preventDefault();
							this.props.searchQuery(this.state.query);
							this.setState({ query: '' });
						}}>
						<input
							style={searchStyles}
							ref={this.searchRef}
							type='text'
							name='query'
							id='query'
							placeholder='search for events'
							value={this.state.query}
							onChange={evt => {
								const { name, value } = evt.target;
								this.setState({ [name]: value });
							}}
						/>
					</form>
				</header>
				<section>
					{this.props.events.map(event => (
						<Events
							view={() => {
								this.props.viewEvent(event._id);
								this.setState({ redirect: true, id: event._id });
							}}
							location={event.location}
							key={event._id}
							title={event.title}
							attending={event.rsvps.includes(this.props.user.email) || false}
							desc={event.description}
							cancel={() => this.props.cancel(event._id)}
							date={event.date}
						/>
					))}
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	events: state.event.searchedEvents,
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	searchQuery: query => dispatch(actionCreators.search(query)),
	viewEvent: id => dispatch(actionCreators.viewEvent(id)),
	cancel: id => dispatch(actionCreators.cancelRsvp(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Radium(SearchedEvents));