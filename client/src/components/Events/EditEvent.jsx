import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/Events/creators';

export class EditEvent extends Component {
	state = {
		title: this.props.event.title,
		description: this.props.event.description,
		img: this.props.event.img,
		location: this.props.event.location,
		date: this.props.event.date
	};
	changeHandler = evt => {
		const { name, value } = evt.target;
		this.setState({ [name]: value });
	};
	static propTypes = {
		event: PropTypes.array.isRequired
	};

	render() {
		const { title, description, location, date, img } = this.state;
		return (
			<div>
				<form
					action='POST'
					onSubmit={evt => {
						evt.preventDefault();
						this.props.saveEvent(this.props.event._id, this.state);
						this.setState({
							title: '',
							description: '',
							location: '',
							date: '',
							img: ''
						});
					}}>
					<div className='form-group'>
						<input
							type='text'
							name='title'
							id='title'
							placeholder='title'
							value={title}
							onChange={this.changeHandler}
						/>
						<input
							type='text'
							name='location'
							id='location'
							placeholder='location '
							onChange={this.changeHandler}
							value={location}
						/>
						<input
							type='text'
							name='date'
							id='date'
							placeholder='--/--/----'
							value={date}
							onChange={this.changeHandler}
						/>
						<input type='file' name='img' id='img' value={img} />
						<textarea
							name='description'
							id='description'
							cols='30'
							rows='10'
							placeholder='Description'
							value={description}
							onChange={this.changeHandler}
						/>
					</div>
					<button>Save</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	event: state.event.selectedEvent[0]
});

const mapDispatchToProps = dispatch => ({
	saveEvent: (id, data) => dispatch(actionCreators.editEvent(id, data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditEvent);
