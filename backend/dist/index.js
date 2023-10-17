"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '../react-app/build')));
app.use(function (req, res) {
    res.status(200).send('Hello, world!');
});
// Start the server
var PORT = process.env.PORT || 4010;
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
    console.log('Press Ctrl+C to quit.');
});
