const express = require('express');
const path = require('path');
const app = express();
import dotenv from 'dotenv';
import {auth, requiresAuth} from 'express-openid-connect';
import https from 'https'; 

require('dotenv').config();

app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');  
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4010;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:4010',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    issuerBaseURL: 'https://dev-qoz5mzp8da7n1lqw.us.auth0.com',
    authorizationParams: {
        response_type: 'code' ,
        //scope: "openid profile email"   
       },
    
};

app.use(auth(config));



app.get('/', (req, res) => {
    let username : string | undefined;
    if (req.oidc.isAuthenticated()) { 
        username = req.oidc.user?.name;
        console.log(req.oidc.user)
        res.render('logged-index', { username: username,
                                      //picture : req.oidc.user?.picture.endsWith('png') ? req.oidc.user?.picture : req.oidc.user.picture+= '.png',
                                 });
    }
    else {
        res.render('index', { username: username, 
                              //picture : req.oidc.user?.picture.endsWith('png') ? req.oidc.user?.picture : req.oidc.user.picture+= '.png', 
                            });
    }
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.render('profile', { username: (req.oidc.user?.name)});
});

app.get("/sign-up", (req, res) => {
    res.oidc.login({
      returnTo: '/',
      authorizationParams: {      
        screen_hint: "signup",
      },
    });
  });
app.get('/logout', (req, res) => {
    req.oidc.logout();
    res.redirect('/');
});
  

// Potencijalno ddati https server ikeyeve ako ce biti problema
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});