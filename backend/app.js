const express = require('express');
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const upload = multer();

const app = express();

//
// Views directory and type setting
app.set('views', path.join(__dirname, '../frontend/'));
app.set('view engine', 'ejs');

//
// Module to use
app.use(express.static(__dirname + '/../public/'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
 }));

app.get('/dyscovery_recorder', (req, res) => {
    res.render('index');
});

app.get('/record', (req, res) => {
    res.render('recorder');
});

app.get('/end', (req, res) => {
    res.render('end.ejs');
});

app.post('/save', upload.any(), (req, res) => {
    let word = req.files[0].originalname.split('_')[0];

    fs.writeFile('/dyscovery_data/' + word + '/' + req.files[0].originalname, Buffer.from(new Uint8Array(req.files[0].buffer)), (err) => {
        if (err) {
            console.log('Error: ', err);
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send('ok');
        }
    });
});

module.exports = app;