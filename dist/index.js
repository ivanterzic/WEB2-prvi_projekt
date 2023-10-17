"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var path = require('path');
var app = express();
var express_openid_connect_1 = require("express-openid-connect");
require('dotenv').config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var PORT = process.env.PORT || 4010;
var config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:4010',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: 'https://dev-qoz5mzp8da7n1lqw.us.auth0.com'
};
app.use((0, express_openid_connect_1.auth)(config));
app.get('/', function (req, res) {
    //I want to render the before written code to index view
    res.render('index', { title: (req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out') });
});
app.get('/profile', (0, express_openid_connect_1.requiresAuth)(), function (req, res) {
    res.render('index', { title: (JSON.stringify(req.oidc.user)) });
});
// Start the server
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
    console.log('Press Ctrl+C to quit.');
});
