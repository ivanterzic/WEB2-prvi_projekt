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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentRoute = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = require("../db");
var tournamenthelper_1 = require("../helpers/tournamenthelper");
var express_openid_connect_1 = require("express-openid-connect");
var express_validator_1 = require("express-validator");
exports.tournamentRoute = express_1.default.Router();
exports.tournamentRoute.use(express_1.default.urlencoded({ extended: true }));
exports.tournamentRoute.use(express_1.default.static('../data'));
exports.tournamentRoute.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idFromQuery, query, result, tournament, parsedTournament, e_1;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                idFromQuery = req.query.code;
                query = "SELECT * FROM tournament WHERE tournamentid = ".concat(idFromQuery);
                _h.label = 1;
            case 1:
                _h.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db.query(query, [])];
            case 2:
                result = _h.sent();
                tournament = result["rows"][0];
                parsedTournament = (0, tournamenthelper_1.databaseFileToTournamentParser)(tournament);
                console.log((_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name);
                console.log(parsedTournament.tournamentCreator);
                console.log((_b = req.oidc.user) === null || _b === void 0 ? void 0 : _b.email);
                console.log(parsedTournament.tournamentCreatorEmail);
                if (((_c = req.oidc.user) === null || _c === void 0 ? void 0 : _c.name) == parsedTournament.tournamentCreator && ((_d = req.oidc.user) === null || _d === void 0 ? void 0 : _d.email) == parsedTournament.tournamentCreatorEmail) {
                    res.render('tournament', { username: ((_e = req.oidc.user) === null || _e === void 0 ? void 0 : _e.name), tournamentName: parsedTournament.competitionName, rounds: parsedTournament.rounds, tournamentid: parsedTournament.tournamentId, error: undefined, url: req.protocol + '://' + req.get('host') + req.originalUrl });
                }
                else {
                    res.render('tournament-nonuser', { username: ((_f = req.oidc.user) === null || _f === void 0 ? void 0 : _f.name), tournamentName: parsedTournament.competitionName, rounds: parsedTournament.rounds, tournamentid: parsedTournament.tournamentId });
                }
                return [3 /*break*/, 4];
            case 3:
                e_1 = _h.sent();
                console.log(e_1);
                res.render('tournament-na', { username: ((_g = req.oidc.user) === null || _g === void 0 ? void 0 : _g.name) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.tournamentRoute.post('/', (0, express_openid_connect_1.requiresAuth)(), [
    // validation middleware: tournamentid, team1, team2, scoreteam1 and scoreteam2 
    // must be present in the request body
    (0, express_validator_1.body)('tournamentid', 'Pokušajte opet!').trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)('team1', 'Pokušajte opet!').trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)('team2', 'Pokušajte opet!').trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)('scoreteam1', 'Rezultat kola ne smije biti prazan!').trim().isInt().toInt().escape(),
    (0, express_validator_1.body)('scoreteam2', 'Rezultat kola ne smije biti prazan!').trim().isInt().toInt().escape(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, errorsArray, result, parsedTournament, query_1, e_2, _i, _a, match, queryUpdate, e_3;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                errorsArray = errors["errors"];
                parsedTournament = {
                    tournamentId: 0,
                    tournamentCreator: "undefined",
                    tournamentCreatorEmail: "undefined",
                    competitionName: "undefined",
                    scoringSystem: {
                        winPoints: 0,
                        drawPoints: 0,
                        lossPoints: 0
                    },
                    competitors: [],
                    rounds: []
                };
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                query_1 = "SELECT * FROM tournament WHERE tournamentid = ".concat(req.body.tournamentid);
                return [4 /*yield*/, db_1.db.query(query_1, [])];
            case 2:
                result = _g.sent();
                parsedTournament = (0, tournamenthelper_1.databaseFileToTournamentParser)(result["rows"][0]);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _g.sent();
                console.log(e_2);
                res.render('tournament-na', { username: ((_b = req.oidc.user) === null || _b === void 0 ? void 0 : _b.name) });
                return [3 /*break*/, 4];
            case 4:
                if (((_c = req.oidc.user) === null || _c === void 0 ? void 0 : _c.name) != parsedTournament.tournamentCreator || ((_d = req.oidc.user) === null || _d === void 0 ? void 0 : _d.email) != parsedTournament.tournamentCreatorEmail) {
                    return [2 /*return*/];
                }
                if (errorsArray.length > 0) {
                    res.render('tournament', { username: ((_e = req.oidc.user) === null || _e === void 0 ? void 0 : _e.name), tournamentName: parsedTournament === null || parsedTournament === void 0 ? void 0 : parsedTournament.competitionName, rounds: parsedTournament === null || parsedTournament === void 0 ? void 0 : parsedTournament.rounds, tournamentid: parsedTournament === null || parsedTournament === void 0 ? void 0 : parsedTournament.tournamentId, error: errorsArray[0].msg, url: req.protocol + '://' + req.get('host') + req.originalUrl });
                }
                for (_i = 0, _a = parsedTournament.rounds; _i < _a.length; _i++) {
                    match = _a[_i];
                    if (match.team1 == req.body.team1 && match.team2 == req.body.team2) {
                        match.scoreTeam1 = Number(req.body.scoreteam1);
                        match.scoreTeam2 = Number(req.body.scoreteam2);
                        break;
                    }
                }
                queryUpdate = "UPDATE tournament SET rounds = '".concat(JSON.stringify(parsedTournament.rounds), "' WHERE tournamentid = ").concat(req.body.tournamentid);
                _g.label = 5;
            case 5:
                _g.trys.push([5, 7, , 8]);
                return [4 /*yield*/, db_1.db.query(queryUpdate, [])];
            case 6:
                result = _g.sent();
                res.redirect("/tournament?code=".concat(req.body.tournamentid));
                return [3 /*break*/, 8];
            case 7:
                e_3 = _g.sent();
                console.log(e_3);
                res.render('tournament', { username: ((_f = req.oidc.user) === null || _f === void 0 ? void 0 : _f.name), tournamentName: parsedTournament === null || parsedTournament === void 0 ? void 0 : parsedTournament.competitionName, rounds: parsedTournament === null || parsedTournament === void 0 ? void 0 : parsedTournament.rounds, tournamentid: parsedTournament === null || parsedTournament === void 0 ? void 0 : parsedTournament.tournamentId, error: e_3.message, url: req.protocol + '://' + req.get('host') + req.originalUrl });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
