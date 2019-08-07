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
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: 150
	},
	rsvps: [String],
	created: {
		type: Date,
		default: new Date().toDateString(),
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

const Event = mongoose.model('Event', EventsSchema);

module.exports = Event;
