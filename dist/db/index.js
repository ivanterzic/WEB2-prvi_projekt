"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    user: 'ivan',
    host: 'dpg-ckp5ak41tcps739j2ceg-a.frankfurt-postgres.render.com',
    database: 'web2lab1_df6p',
    password: '4qZ0lzhtpdWvRGA6oOwh5liS3KOu1YKx',
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
