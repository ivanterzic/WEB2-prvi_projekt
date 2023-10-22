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
exports.createRoute = void 0;
var express_1 = __importDefault(require("express"));
var express_openid_connect_1 = require("express-openid-connect");
var express_validator_1 = require("express-validator");
var tournamenthelper_js_1 = require("../helpers/tournamenthelper.js");
var index_js_1 = require("../db/index.js");
exports.createRoute = express_1.default.Router();
exports.createRoute.use(express_1.default.urlencoded({ extended: true }));
exports.createRoute.use(express_1.default.static('../data'));
exports.createRoute.get('/', (0, express_openid_connect_1.requiresAuth)(), function (req, res) {
    var _a, _b;
    res.render('create', { username: ((_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name), picture: ((_b = req.oidc.user) === null || _b === void 0 ? void 0 : _b.picture), message: undefined, error_message: undefined, competitionName: undefined, winPoints: undefined, drawPoints: undefined, lossPoints: undefined, competitors: undefined });
});
exports.createRoute.post('/', (0, express_openid_connect_1.requiresAuth)(), [
    // Add validation and sanitization middleware
    (0, express_validator_1.body)('competitionName', 'Ime natjecanja ne smije biti prazno!').trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)('winPoints', 'Bodovi za pobjedu ne smiju biti prazni te moraju biti cijeli broj!').trim().isInt().escape(),
    (0, express_validator_1.body)('drawPoints', 'Bodovi za neriješeno ne smiju biti prazni te moraju biti cijeli broj!').trim().isInt().escape(),
    (0, express_validator_1.body)('lossPoints', 'Bodovi za poraz ne smiju biti prazni te moraju biti cijeli broj!').trim().isInt().escape(),
    (0, express_validator_1.body)('competitors', 'Popis natjecatelja ne smije biti prazan!').trim().isLength({ min: 1 }).escape(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, errorsArray, comps, newTournament, sql, result, e_1;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                errorsArray = errors["errors"];
                comps = req.body.competitors.trim().split("\r\n");
                if (comps.length == 1) {
                    comps = req.body.competitors.trim().split(";");
                }
                if (comps.length < 4 || comps.length > 8) {
                    errorsArray.push({ msg: "Broj natjecatelja mora biti između 4 i 8! Vi ste unijeli " + comps.length + " natjecatelja!" });
                }
                if (!(errorsArray.length > 0)) return [3 /*break*/, 1];
                res.render('create', { username: ((_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name), picture: ((_b = req.oidc.user) === null || _b === void 0 ? void 0 : _b.picture), error_message: errorsArray[0].msg, message: undefined,
                    competitionName: req.body.competitionName, winPoints: req.body.winPoints, drawPoints: req.body.drawPoints, lossPoints: req.body.lossPoints, competitors: req.body.competitors });
                return [3 /*break*/, 6];
            case 1:
                newTournament = {
                    tournamentId: undefined,
                    tournamentCreator: (_c = req.oidc.user) === null || _c === void 0 ? void 0 : _c.name,
                    tournamentCreatorEmail: (_d = req.oidc.user) === null || _d === void 0 ? void 0 : _d.email,
                    competitionName: req.body.competitionName,
                    scoringSystem: {
                        winPoints: Number(req.body.winPoints),
                        drawPoints: Number(req.body.drawPoints),
                        lossPoints: Number(req.body.lossPoints)
                    },
                    competitors: comps,
                    rounds: (0, tournamenthelper_js_1.roundCreatorBergerTables)(comps)
                };
                sql = "INSERT INTO tournament (tournamentCreator, tournamentCreatorEmail, tournamentName, competitors, scoringSystem, rounds) VALUES ('".concat(req.oidc.user.name, "', '").concat(req.oidc.user.email, "' , '").concat(req.body.competitionName.trim(), "', '").concat(comps, "', '").concat(JSON.stringify(newTournament.scoringSystem), "', '").concat(JSON.stringify(newTournament.rounds), "')");
                _h.label = 2;
            case 2:
                _h.trys.push([2, 4, , 5]);
                return [4 /*yield*/, index_js_1.db.query(sql, [])];
            case 3:
                result = _h.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _h.sent();
                res.render('create', { username: (req.oidc.user.name), picture: ((_e = req.oidc.user) === null || _e === void 0 ? void 0 : _e.picture), error_message: "Greška kod spremanja u bazu podataka!", message: undefined,
                    competitionName: req.body.competitionName, winPoints: req.body.winPoints, drawPoints: req.body.drawPoints, lossPoints: req.body.lossPoints, competitors: req.body.competitors });
                return [3 /*break*/, 5];
            case 5:
                res.render('create', { username: ((_f = req.oidc.user) === null || _f === void 0 ? void 0 : _f.name), picture: ((_g = req.oidc.user) === null || _g === void 0 ? void 0 : _g.picture), error_message: undefined, message: "Natjecanje uspješno kreirano!", competitionName: undefined, winPoints: undefined, drawPoints: undefined, lossPoints: undefined, competitors: undefined });
                _h.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
