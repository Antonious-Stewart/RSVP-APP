const http = require('http');
const app = require('./app.js');
const server = http.createServer(app);
const PORT = process.env.PORT;
//run server
server.listen(PORT, () => {
	console.log(`Server Up and running on port ${PORT}`);
});
