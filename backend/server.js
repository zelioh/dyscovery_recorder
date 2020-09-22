const http = require('http');
const app = require('./app');
const https = require('https');
const fs = require('fs');

console.log('Server start !')

app.set('port', process.env.PORT || 8042);

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(8042);