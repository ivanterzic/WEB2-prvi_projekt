"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoute = void 0;
var express_1 = __importDefault(require("express"));
var express_openid_connect_1 = require("express-openid-connect");
var express_validator_1 = require("express-validator");
var memory_js_1 = __importDefault(require("../data/memory.js"));
var tournamenthelper_js_1 = require("../helpers/tournamenthelper.js");
exports.createRoute = express_1.default.Router();
exports.createRoute.use(express_1.default.urlencoded({ extended: true }));
exports.createRoute.use(express_1.default.static('../data'));
exports.createRoute.get('/', (0, express_openid_connect_1.requiresAuth)(), function (req, res) {
    var _a;
    console.log(JSON.stringify(memory_js_1.default));
    res.render('create', { username: ((_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name), message: undefined, error_message: undefined, competitionName: undefined, winPoints: undefined, drawPoints: undefined, lossPoints: undefined, competitors: undefined });
});
exports.createRoute.post('/', (0, express_openid_connect_1.requiresAuth)(), [
    // Add validation and sanitization middleware
    (0, express_validator_1.body)('competitionName', 'Ime natjecanja ne smije biti prazno!').trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)('winPoints', 'Bodovi za pobjedu ne smiju biti prazni!').trim().isInt().escape(),
    (0, express_validator_1.body)('drawPoints', 'Bodovi za neriješeno ne smiju biti prazni!').trim().isInt().escape(),
    (0, express_validator_1.body)('lossPoints', 'Bodovi za poraz ne smiju biti prazni!').trim().isInt().escape(),
    (0, express_validator_1.body)('competitors', 'Popis natjecatelja ne smije biti prazan!').trim().isLength({ min: 1 }).escape(),
], function (req, res) {
    var _a, _b, _c;
    var errors = (0, express_validator_1.validationResult)(req);
    var errorsArray = errors["errors"];
    var comps = req.body.competitors.trim().split("\r\n");
    if (comps.length == 1) {
        comps = req.body.competitors.trim().split(";");
    }
    console.log(comps);
    console.log(comps.length);
    if (comps.length < 4 || comps.length > 8) {
        errorsArray.push({ msg: "Broj natjecatelja mora biti između 4 i 8!" });
    }
    console.log(errorsArray);
    if (errorsArray.length > 0) {
        res.render('create', { username: ((_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name), error_message: errorsArray[0].msg, message: undefined,
            competitionName: req.body.competitionName, winPoints: req.body.winPoints, drawPoints: req.body.drawPoints, lossPoints: req.body.lossPoints, competitors: req.body.competitors });
    }
    else {
        var newTournament = {
            torunamentCreator: (_b = req.oidc.user) === null || _b === void 0 ? void 0 : _b.sid,
            competitionName: req.body.competitionName,
            scoringSystem: {
                winPoints: Number(req.body.winPoints),
                drawPoints: Number(req.body.drawPoints),
                lossPoints: Number(req.body.lossPoints)
            },
            competitors: comps,
            rounds: (0, tournamenthelper_js_1.roundCreatorBergerTables)(comps)
        };
        memory_js_1.default.push(newTournament);
        res.render('create', { username: ((_c = req.oidc.user) === null || _c === void 0 ? void 0 : _c.name), error_message: undefined, message: "Natjecanje uspješno kreirano!", competitionName: undefined, winPoints: undefined, drawPoints: undefined, lossPoints: undefined, competitors: undefined });
    }
});
