'use strict';

var _ = require('underscore');
var utils = require('../../utils/utils.js');
var default_wall = require('./default_wall.js');

var proto = {};

module.exports = function (id, preferences) {
    var world = this;
    preferences = _.extend({}, default_wall, world.preferences.wall, preferences); // TODO: ??
    var wall = _.extend(Object.create(proto), preferences);
    wall.world = world;

};