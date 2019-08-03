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
		uppercase: true,
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
EventsSchema.pre('remove', async function(next) {
	const event = this;
	//find all users with the current event id
	const users = await User.find({ attending: event._id });
	//iterate through those users and remove any rsvp associated with it
	users.attending = users.attending.filter(rsvp => rsvp !== event.id);
	await user.save();
	next();
});
const Event = mongoose.model('Event', EventsSchema);

module.exports = Event;
