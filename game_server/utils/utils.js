'use strict';

var _ = require('underscore');
var make_point = require('./point.js');

module.exports = {
    make_point: make_point,
    random_int: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    random_point: function (size){
        var x = this.random_int(0, size[0]);
        var y = this.random_int(0, size[1]);
        return make_point(x , y);
    },
    events_mixin: function (obj) {
        var listeners = {};
        obj.on = function (event, listener) {
            if (!_.isFunction(listener)) {
                console.warn('listener is not a function');
                return;
            }
            if (!listeners[event]) {
                listeners[event] = [];
            }
            listeners[event].push(listener);
            return listeners.length - 1;
        };
        obj.off = function (event, arg) {
            var id;
            if (_.isNumber(arg)) {
                id = arg;
                return listeners[event][id] ? delete listeners[event][id] : false;
            } else if (_.isFunction(arg)) {
                id = listeners[event] ? listeners[event].indexOf(arg) : -1;
                return listeners[event][id] ? delete listeners[event][id] : false;
            }
            return false;
        };
        obj.trigger = function (event, data) {
            if (listeners[event]) {
                listeners[event].forEach(function (f) {
                    f(data);
                });
            }
        };
        return obj;
    }
};