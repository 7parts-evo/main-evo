'use strict';

var _ = require('underscore');
var utils = require('../../utils/utils.js');
var default_food = require('./default_food.js');

var proto = {
    get type() { return 'food'; },
    world: null,
    get json() {
        var self = this;
        var res = {
            id: self.id,
            type: self.type,
            position: [self.position.x, self.position.y],
            size: self.size,
            radius: self.radius
        };
        if (this.world && this.world.preferences.debug) { // TODO: ??
            res.around = self.around;
        }
        return res;
    },
    remove: function () {
        if (this.world) {
            this.world.remove(this);
        }
        this.trigger('remove');
    }
};

module.exports = function (id, preferences) {
    var world = this;
    preferences = _.extend({}, default_food, world.preferences.food, preferences);
    var food = _.extend(Object.create(proto), preferences);
    utils.events_mixin(food);
    food.__defineGetter__('id', function () { return id; });
    if (food.random) {
        food.position = utils.random_point([world.preferences.width, world.preferences.height]);
        var tmp = utils.random_int(1, 10);
        food.size = tmp;
        food.radius = tmp;
        food.direction = utils.random_int(1, 360);
    } else {
        food.position = utils.make_point(food.position);
    }
    return food;
};