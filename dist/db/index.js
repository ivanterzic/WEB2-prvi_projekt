"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var pg_1 = require("pg");
require('dotenv').config();
var pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: true
});
var db = {
    query: function (text, params) {
        var start = Date.now();
        return pool.query(text, params)
            .then(function (res) {
            var duration = Date.now() - start;
            return res;
        });
    },
    pool: pool
};
exports.db = db;
