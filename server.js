const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 3000;
require('./lib/connect')();

const server = http.createServer(app);
server.listen(port, () => {
    console.log('server running at port', port);
});