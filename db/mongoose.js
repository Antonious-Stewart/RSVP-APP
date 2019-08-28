const mongoose = require('mongoose');
// use mongoose library for promises
// global.Promise = mongoose.Promise;

//connect mongoose
mongoose.connect(process.env.MONGODB, {
	useCreateIndex: true,
	useFindAndModify: false,
	useNewUrlParser: true
});
