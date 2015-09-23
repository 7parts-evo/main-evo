'use strict';

var auth_rule = require('./rules/auth.js');
var tester_rule = require('./rules/tester.js');
var play_rule = require('./rules/play.js');

var rules = [];

var ruler = {
    bind_socket: function (socket) {
        socket.rules = {};
        var emit_wrapper = function () {
            socket.emit.apply(socket, Array.prototype.slice.apply(arguments));
        };
        rules.forEach(function (rule) {
            var storage = {
                get scope() { return socket.rules; }
            };
            Object.keys(rule).forEach(function (key) {
                if (key === 'name' || key === 'init') {
                    return;
                }
                socket.on(key, function (data) {
                    rule[key](storage, emit_wrapper, data);
                });
            });
            socket.rules[rule['name']] = storage;
            if (rule.init) {
                rule.init(storage, emit_wrapper);
            }
        });
    },
    add_rule: function (rule) {
        rules.push(rule);
    },
    remove_rule: function (rule) {
        rules.splice(rules.indexOf(rule), 1);
    }
};

ruler.add_rule(auth_rule);
ruler.add_rule(tester_rule);
ruler.add_rule(play_rule);

module.exports = ruler;