import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Events from './Events';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/Events/creators';

export class SearchedEvents extends Component {
	state = {
		query: '',
		redirect: false,
		id: ''
	};
	static propTypes = {
		search: PropTypes.bool.isRequired,
		searchedEvents: PropTypes.array.isRequired
	};

	render() {
		return (
			<div>
				{this.state.redirect && <Redirect to={`/event/${this.state.id}`} />}
				<header>
					<form
						method='get'
						onSubmit={async evt => {
							evt.preventDefault();
							this.props.searchQuery(this.state.query);
							this.setState({ query: '', redirect: true });
						}}>
						<input
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
	viewEvent: id => dispatch(actionCreators.viewEvent(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchedEvents);
