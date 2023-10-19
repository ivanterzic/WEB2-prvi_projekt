"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var path = require('path');
var app = express();
var express_openid_connect_1 = require("express-openid-connect");
var create_routes_1 = require("./routes/create.routes");
var tournament_routes_1 = require("./routes/tournament.routes");
require('dotenv').config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
var PORT = process.env.PORT || 4010;
var config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:4010',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    issuerBaseURL: 'https://dev-qoz5mzp8da7n1lqw.us.auth0.com',
    authorizationParams: {
        response_type: 'code',
        //scope: "openid profile email"   
    },
};
app.use((0, express_openid_connect_1.auth)(config));
app.use('/create', (0, express_openid_connect_1.requiresAuth)(), create_routes_1.createRoute);
app.use('/tournament', tournament_routes_1.tournamentRoute);
app.get('/', function (req, res) {
    var _a;
    var username;
    if (req.oidc.isAuthenticated()) {
        username = (_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name;
        console.log(req.oidc.user);
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
app.get('/profile', (0, express_openid_connect_1.requiresAuth)(), function (req, res) {
    var _a;
    res.render('profile', { username: ((_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name) });
});
app.get("/sign-up", function (req, res) {
    res.oidc.login({
        returnTo: '/',
        authorizationParams: {
            screen_hint: "signup",
        },
    });
});
app.get('/logout', function (req, res) {
    req.oidc.logout();
    res.redirect('/');
});
// Potencijalno ddati https server ikeyeve ako ce biti problema
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
    console.log('Press Ctrl+C to quit.');
});
