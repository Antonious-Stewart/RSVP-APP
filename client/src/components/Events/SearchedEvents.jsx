import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';
import Events from './Events';
import * as actionCreators from '../../store/actions/Events/creators';

export class SearchedEvents extends Component {
	constructor(props) {
		super(props);
		this.searchRef = React.createRef();
	}
	state = {
		query: ''
	};
	static propTypes = {
		search: PropTypes.bool,
		events: PropTypes.array.isRequired
	};
	componentDidMount() {
		this.searchRef.current.focus();
		this.setState({ loading: false });
	}

	render() {
		const headerStyles = {
			minHeight: '100vh',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
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
		const eventsStyles = {
			padding: '1.25rem 2rem',
			marginRight: '2rem',
			marginBottom: '3rem',
			flex: '0',
			boxShadow: '0 0 3px rgba(0,0,0,.6)',
			borderRadius: '2rem',
			fontSize: '1.4rem'
		};
		return (
			<div>
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
				{this.props.events.length !== 0 && (
					<section
						style={{
							display: 'flex',
							alignContent: 'center',
							justifyContent: 'center',
							minHeight: '100vh',
							padding: '4rem',
							flexDirection: 'column-reverse'
						}}>
						{this.props.events.map(event => (
							<Events
								eventsStyles={eventsStyles}
								view={() => {
									this.props.viewEvent(event._id);
									this.props.history.push(`/Event/${event._id}`);
								}}
								reserve={() => this.props.reserve(event._id)}
								location={event.location}
								key={event._id}
								title={event.title}
								attending={
									this.props.user.attending.includes(event.title) || false
								}
								desc={event.description}
								cancel={() => this.props.cancel(event._id)}
								date={event.date}
							/>
						))}
					</section>
				)}
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
	cancel: id => dispatch(actionCreators.cancelRsvp(id)),
	reserve: id => dispatch(actionCreators.rsvp(id))
});
SearchedEvents = Radium(SearchedEvents);
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(SearchedEvents));
