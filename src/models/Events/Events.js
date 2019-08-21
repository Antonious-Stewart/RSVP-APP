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
	const users = await User.find({ attending: event.title });
	users = users.map(user =>
		user.attending.filter(async attend => {
			attend !== event.title;
			await user.save();
		})
	);
	console.log(users);
	next();
});
const Event = mongoose.model('Event', EventsSchema);

module.exports = Event;
