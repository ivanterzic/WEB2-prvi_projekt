const express = require('express');
const path = require('path');
const app = express();
import dotenv from 'dotenv';
import {auth, requiresAuth} from 'express-openid-connect';
import https from 'https'; 

require('dotenv').config();

app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');  
 
const PORT = process.env.PORT || 4010;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:4010',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: 'https://dev-qoz5mzp8da7n1lqw.us.auth0.com'
};

app.use(auth(config));

app.get('/', (req, res) => {
    //I want to render the before written code to index view
    res.render('index', { title: (req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')});
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.render('index', { title: (JSON.stringify(req.oidc.user))});
});

// Start the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});