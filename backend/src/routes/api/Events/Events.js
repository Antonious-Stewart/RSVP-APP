const Event = require('../../../models/Events/Events');
const router = require('express').Router();
const auth = require('../../../middleware/auth');

//get all events
router.get('/', async (req, res) => {
	try {
		const events = await Event.find({});
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
		const events = await new Event({
			...req.body,
			organizer: req.user._id,
			rsvps: req.user.email
		}).save();
		if (!events) {
			return res.status(400).send('Bad Request');
		}
		res.status(201).send(events);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});
//show event
router.get('/:id', auth, async (req, res) => {
	try {
		const event = await Event.findOne({
			organizer: req.user._id,
			_id: req.params.id
		});
		if (!event) {
			return res.status(404).send(' not found');
		}
		await event.populate('organizer').execPopulate();
		await event.save();
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
	const allowedUpdate = ['description', 'title', 'date'];
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
			res.status(202).send(event);
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
		if (event.rsvps.includes(req.params.id)) {
			return res.status(400).send('bad request');
		}
		req.user.attending = [...req.user.attending, req.params.id];
		res.status(201).send(req.user);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});
//users can cancel the rsvp
router.post(
	`/rsvp/${encodeURI('cancel rsvp')}/:eventId`,
	auth,
	async (req, res) => {
		//remove match the event with the matching from req.user.attending
		try {
			req.user.attending = req.user.attending.filter(
				rsvp => rsvp.attending !== req.params.eventId
			);
			req.user.save();
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
//the organizer can delete the event
router.delete('/:id', auth, async (req, res) => {
	try {
		const event = await Event.findOne({
			'tokens.token': req.token,
			organizer: req.user._id
		});
		if (!event) {
			res.status(403).send('Not authorized to make this action');
		}
		await event.remove();
		res.status(202).send(event);
	} catch (err) {
		res.status(500).send(err);
	}
});
module.exports = router;
