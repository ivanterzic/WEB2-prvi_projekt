"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var path = require('path');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(function (req, res) {
    res.render('index');
});
// Start the server
var PORT = process.env.PORT || 4010;
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
    console.log('Press Ctrl+C to quit.');
});
