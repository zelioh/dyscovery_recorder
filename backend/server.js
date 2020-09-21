const http = require('http');
const app = require('./app');

console.log('Server start !')

app.set('port', process.env.PORT || 8042);
const server = http.createServer(app);

server.listen(process.env.PORT || 8042);