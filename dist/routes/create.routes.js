"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoute = void 0;
var express_1 = __importDefault(require("express"));
exports.createRoute = express_1.default.Router();
exports.createRoute.get('/', function (req, res) {
    var _a;
    res.render('create', { username: ((_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name) });
});
