require('./db/mongoose');
const path = require('path');
const express = require('express');
const app = express();
const userAPIRoute = require('./routes/api/User/user');
const eventAPIRoute = require('./routes/api/Events/Events');

//middleware
//parse json from request body
app.use(express.json());
//parse x-form-urlencoded-data
app.use(express.urlencoded({ extended: true }));
//use express router with api routes
app.use('/api/user', userAPIRoute);
app.use('/api/events', eventAPIRoute);
//serve static assest in production
if (process.env.NODE_ENV === 'production') {
	const publicDirectory = path.join(__dirname, '/client/build/');
	app.use(express.static(publicDirectory));
}
module.exports = app;