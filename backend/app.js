const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({message: 'Hello world'});
});

module.exports = app;