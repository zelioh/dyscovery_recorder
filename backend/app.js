const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, '../frontend/'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public/'));

app.get('/dyscovery_recorder', (req, res) => {
    res.render('index')
});

module.exports = app;