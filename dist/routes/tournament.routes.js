"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentRoute = void 0;
var express_1 = __importDefault(require("express"));
var memory_1 = __importDefault(require("../data/memory"));
exports.tournamentRoute = express_1.default.Router();
exports.tournamentRoute.use(express_1.default.urlencoded({ extended: true }));
exports.tournamentRoute.use(express_1.default.static('../data'));
exports.tournamentRoute.get('/', function (req, res) {
    var _a;
    console.log(memory_1.default);
    res.render('tournament', { username: ((_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name) });
});
