const express = require('express');
const path = require('path');
const app = express();
import {auth, requiresAuth} from 'express-openid-connect';
import { createRoute } from './routes/create.routes';
import { tournamentRoute } from './routes/tournament.routes';

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
    clientSecret: process.env.CLIENT_SECRET,
    issuerBaseURL: 'https://dev-qoz5mzp8da7n1lqw.us.auth0.com',
    authorizationParams: {
        response_type: 'code' , 
       },
    
};

app.use(auth(config));

app.use('/create', requiresAuth(), createRoute);
app.use('/tournament', tournamentRoute);


app.get('/', (req, res) => {
    let username : string | undefined;
    if (req.oidc.isAuthenticated()) { 
        username = req.oidc.user?.name;
        console.log(req.oidc.user)
        res.render('logged-index', { username: username,
          picture: (req.oidc.user?.picture)
                                 });
    }
    else {
        res.render('index', { username: username, 
          picture: (req.oidc.user?.picture)
                            });
    }
});


import { db } from './db';
import { databaseFileToTournamentParser } from './helpers/tournamenthelper';

app.get('/profile', requiresAuth(), async (req, res) => {
  let idFromQuery = req.query.code;
        let query = `SELECT * FROM tournament WHERE tournamentCreator = '${req.oidc.user?.name}' AND tournamentCreatorEmail = '${req.oidc.user?.email}'`;
        try {
          const result = await db.query(query, []);
          let tournaments : any[] = result["rows"]
          for (let i = 0; i < tournaments.length; i++) {
              tournaments[i] = databaseFileToTournamentParser(tournaments[i]);
          }
          res.render('profile', 
          { username: (req.oidc.user?.name), 
            picture: (req.oidc.user?.picture),
            email : (req.oidc.user?.email),
            nickname : (req.oidc.user?.nickname),
            tournaments : tournaments, 
          });
        }
        catch (e) {
          console.log(e);
          res.render('tournament-na', { username: (req.oidc.user?.name), picture: (req.oidc.user?.picture) });
        }
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
// Potencijalno dodati https server i keyeve ako ce biti problema
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});