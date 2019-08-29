const mongoose = require('mongoose');
const User = require('../User/User');
//events schema
const EventsSchema = new mongoose.Schema({
	organizer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true,
		trim: true,
		maxlength: 50
	},
	img: {
		type: String,
		trim: true,
		validate(value) {
			if (
				!value.endsWith('jpeg') ||
				!value.endsWith('png') ||
				!value.endsWith('svg') ||
				!value.endsWith('gif') ||
				!value.endsWith('jpg')
			) {
				throw new Error();
			}
		}
	},
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: 150
	},
	location: {
		type: String,
		trim: true,
		required: true
	},
	rsvps: [String],
	created: {
		type: Date,
		default: Date.now(),
		required: true
	},
	date: {
		type: Date,
		required: true,
		validate(value) {
			if (!Object.is(new Date(value).getFullYear(), new Date().getFullYear())) {
				throw new Error('Must Be within this year');
			}
		}
	}
});

const Event = mongoose.model('Event', EventsSchema);

module.exports = Event;
