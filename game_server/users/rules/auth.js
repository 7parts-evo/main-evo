'use strict';

var db = require('../db.js');
var _ = require('underscore');

var users = {};

var make_user = function (db_data) {
    var emitters = [];
    var user = {
        add_emit: function (emit) {
            emitters.push(emit);
        },
        remove_emit: function (emit) {
            emitters.splice(emitters.indexOf(emit), 1);
        },
        emit: function (event, data) {
            emitters.forEach(function (item) {
                item(event, data);
            });
        }
    };
    _.extend(user, db_data);
    return user;
};

var rule = {
    name: 'user',
    login: function (storage, emit, data) {
        var secret = data.secret;
        if (users[secret]) {
            storage.user = users[secret];
            users[secret].add_emit(emit);
            emit('state', 'tester');
            return;
        }
        var promise = db.select_user_by_secret(secret);
        promise.then(function (db_data) {
            if (!db_data) {
                console.log('wrong login');
                emit('login', 'wrong');
                return;
            }
            users[secret] = make_user(db_data);
            emit('state', 'tester');
            storage.user = users[secret];
            users[secret].add_emit(emit);
        });
    },
    disconnect: function (storage, emit) {
        if (storage.user.remove_emit) {
            storage.user.remove_emit(emit);
        }
    }
};

module.exports = rule;