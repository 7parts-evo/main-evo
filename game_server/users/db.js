'use strict';

var db_host = '188.166.85.160';
var db_user = 'php_back_user';
var db_pass = 'barracuda';
var db_name = 'edrise';

var mysql = require('mysql');
var Promise = require('promise');

var connection = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_pass,
    database: db_name
});

connection.connect();

module.exports = {
    select_user_by_secret: function (secret) {
        return new Promise(function (resolve, reject) {
            connection.query('select * from users where `secret`=' + mysql.escape(secret), function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.length == 1 ? rows[0] : null);
                }
            });
        });
    }
};