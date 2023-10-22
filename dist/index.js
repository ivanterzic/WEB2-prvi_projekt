"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var path = require('path');
var app = express();
var express_openid_connect_1 = require("express-openid-connect");
var create_routes_1 = require("./routes/create.routes");
var tournament_routes_1 = require("./routes/tournament.routes");
var url = require('url');
require('dotenv').config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var PORT = process.env.PORT || 4010;
var config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    issuerBaseURL: 'https://dev-qoz5mzp8da7n1lqw.us.auth0.com',
    authorizationParams: {
        response_type: 'code',
    },
};
app.use((0, express_openid_connect_1.auth)(config));
app.use('/create', (0, express_openid_connect_1.requiresAuth)(), create_routes_1.createRoute);
app.use('/tournament', tournament_routes_1.tournamentRoute);
app.get('/', function (req, res) {
    var _a, _b, _c;
    var username;
    if (req.oidc.isAuthenticated()) {
        username = (_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name;
        console.log(req.oidc.user);
        res.render('logged-index', { username: username,
            picture: ((_b = req.oidc.user) === null || _b === void 0 ? void 0 : _b.picture)
        });
    }
    else {
        res.render('index', { username: username,
            picture: ((_c = req.oidc.user) === null || _c === void 0 ? void 0 : _c.picture)
        });
    }
});
var db_1 = require("./db");
var tournamenthelper_1 = require("./helpers/tournamenthelper");
app.get('/profile', (0, express_openid_connect_1.requiresAuth)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idFromQuery, query, result, tournaments, i, e_1;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                idFromQuery = req.query.code;
                query = "SELECT * FROM tournament WHERE tournamentCreator = '".concat((_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name, "' AND tournamentCreatorEmail = '").concat((_b = req.oidc.user) === null || _b === void 0 ? void 0 : _b.email, "'");
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db.query(query, [])];
            case 2:
                result = _g.sent();
                tournaments = result["rows"];
                for (i = 0; i < tournaments.length; i++) {
                    tournaments[i] = (0, tournamenthelper_1.databaseFileToTournamentParser)(tournaments[i]);
                }
                res.render('profile', { username: ((_c = req.oidc.user) === null || _c === void 0 ? void 0 : _c.name),
                    picture: ((_d = req.oidc.user) === null || _d === void 0 ? void 0 : _d.picture),
                    email: ((_e = req.oidc.user) === null || _e === void 0 ? void 0 : _e.email),
                    nickname: ((_f = req.oidc.user) === null || _f === void 0 ? void 0 : _f.nickname),
                    tournaments: tournaments, });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _g.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
// Potencijalno dodati https server i keyeve ako ce biti problema
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
    console.log('Press Ctrl+C to quit.');
});
