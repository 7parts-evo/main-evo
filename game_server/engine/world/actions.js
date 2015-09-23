'use strict';

var _ = require('underscore');
var logic = require('./logic.js');

module.exports = function (world, scope) {
    world.start = function () {
        scope.timer = setInterval(_.bind(logic.framer, logic, world, scope), world.preferences.delay);
        this.trigger('start');
    };
    world.clear = function () {
        logic.initiator(world, scope);
        this.trigger('clear');
    };
    world.stop = function () {
        clearInterval(scope.timer);
        scope.timer = -1;
        this.trigger('stop');
    };
    return world;
};