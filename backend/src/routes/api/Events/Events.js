const Event = require('../../../models/Events/Events');
const router = require('express').Router();
const auth = require('../../../middleware/auth');

//get all events
router.get('/', auth, async (req, res) => {
	try {
		if (req.query.search === '') {
			//if nothing is typed in show all events
			const events = await Event.find();
			if (events.length === 0) {
				return res.status(404).send('No Events at this time come back again');
			}
			return res.status(200).send(events);
		} // if search query is provided search the entry by the title
		else if (req.query.search) {
			const events = await Event.find({ title: req.query.search });
			if (events.length === 0) {
				return res.status(404).send('No Events at this time come back again');
			}
			return res.status(200).send(events);
		}
		const events = await Event.find({ rsvps: req.user.email });
		if (events.length === 0) {
			return res.status(404).send('No Events at this time come back again');
		}
		res.status(200).send(events);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});
//create a event
router.post('/create', auth, async (req, res) => {
	try {
		//create an event with the users id and email
		const event = await new Event({
			...req.body,
			organizer: req.user._id,
			rsvps: req.user.email
		}).save();
		if (!event) {
			return res.status(400).send('Bad Request');
		}
		req.user.attending = [...req.user.attending, event.title];
		await req.user.save();
		res.status(201).send(event);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});
//show event
router.get('/:id', auth, async (req, res) => {
	try {
		const event = await Event.findOne({
			_id: req.params.id
		});
		if (!event) {
			return res.status(404).send('not found');
		}
		res.status(200).json(event);
	} catch (err) {
		res.status(500).send(err);
	}
});
//edit event
router.patch('/:id/edit', auth, async (req, res) => {
	// turn req.body into an array of its keys
	const updates = Object.keys(req.body);
	// updates that are allowd to be made
	const allowedUpdate = ['description', 'title', 'date', 'location', 'img'];
	// check elements in the updates array and see if every elements matches
	// the allowed updates
	const isValidUpdate = updates.every(update => allowedUpdate.includes(update));
	try {
		if (isValidUpdate) {
			const event = await Event.findOne({
				organizer: req.user._id,
				_id: req.params.id
			});
			if (!event) {
				return res.status(404).send('not found');
			}
			//update the event
			updates.forEach(update => (event[update] = req.body[update]));
			await event.save();
			res.status(200).send(event);
		}
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});
//users can rsvp
router.post('/rsvp/:id', auth, async (req, res) => {
	try {
		const event = await Event.findOne({ _id: req.params.id });
		if (!event) {
			return res.status(404).send('not found');
		}
		//if user has already rsvp cancel request
		if (event.rsvps.includes(req.user.email)) {
			return res.status(400).send('bad request');
		}
		// concat the new rsvp to the existing array
		event.rsvps = [...event.rsvps, req.user.email];
		await event.save();
		// add event to users events they are attending
		req.user.attending = [...req.user.attending, event.title];
		await req.user.save();
		res.status(201).send(event);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});
//users can cancel the rsvp
router.post(`/${encodeURI('cancel rsvp')}/:id`, auth, async (req, res) => {
	//remove match the event with the matching from req.user.attending
	try {
		const event = await Event.findOne({ _id: req.params.id });
		// ensure the user has rsvp'd to the event
		if (event.rsvps.includes(req.user.email)) {
			// remove user email
			event.rsvps = event.rsvps.filter(rsvp => rsvp !== req.user.email);
			await event.save();
			// remove the event from the users attending list
			req.user.attending = req.user.attending.filter(
				rsvp => rsvp !== event.title
			);
			await req.user.save();
			return res.status(200).send(req.user);
		}
		res.status(400).send('bad request');
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});
//delete event route
router.delete('/:id', auth, async (req, res) => {
	try {
		const event = await Event.findOneAndDelete({
			_id: req.params.id,
			organizer: req.user._id
		});
		if (!event) {
			return res.status(404).send('Not found');
		}
		res.send(200).send(event);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});
module.exports = router;
