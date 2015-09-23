'use strict';

var _ = require('underscore');
var utils = require('../../utils/utils.js');
var logic = require('./logic.js');
var factories = require('./factories.js');
var actions = require('./actions.js');
var default_world = require('./default_world.js');

var make_world = function (preferences) {
    preferences = _.extend({}, default_world, preferences);

    var scope = {
        timer: -1,
        frameCounter: 0,
        tickCounter: 0,
        unitCounter: 0,
        units: []
    };

    var world = {
        get units() { return scope.units.slice(); },
        remove: function (unit) {
            scope.units.splice(scope.units.indexOf(unit), 1);
            this.trigger('remove-unit', unit);
        },
        get preferences() { return preferences; },
        get running() { return scope.timer !== -1; },
        get tick() { return scope.tickCounter; },
        get json() {
            return {
                units: scope.units.map(function (unit) { return unit.json; }),
                width: preferences.width,
                height: preferences.height,
                tick: scope.tickCounter
            }
        },
        start: function () {},
        clear: function () {},
        stop: function () {},
        make_player: function (opts) {},
        make_food: function (opts) {},
        make_wall: function (opts) {}
    };

    utils.events_mixin(world);
    factories(world, scope);
    actions(world, scope);
    logic.initiator(world, scope);
    return world;
};

module.exports = make_world;