'use strict';

var utils = require('../../utils/utils.js');
module.exports = {
    width: 600,
    height: 600,
    cyclic: true,
    delay: 40,
    tickLength: 3,
    nUnits: 100,
    debug: false,
    init: function (world, scope) {},
    frame: function (world, scope) {
        scope.units.forEach(function (unit) {
            if (unit.speed + unit.accelerate < unit.max_speed) {
                unit.speed = unit.speed + unit.accelerate;
            } else {
                unit.speed = unit.max_speed;
            }
            var delta = utils.make_point(1, 0);
            var angle = unit.direction;
            delta.angle = angle;
            delta.length = unit.speed;
            var new_pos = unit.position.add(delta);
            new_pos.x = (world.preferences.width + (new_pos.x % world.preferences.width)) % world.preferences.width;
            new_pos.y = (world.preferences.height + (new_pos.y % world.preferences.height)) % world.preferences.height;
            unit.position = new_pos;
        });
        createFood();
        return scope.units;

        function createFood() {
            if (Math.random() > 0.8 && scope.units.length < world.preferences.nUnits) {
                world.make_food({
                    random: true
                });
            }
        }
    },
    tick: function (world, scope) {
        var neighbour = {
            unit: null,
            dist: 0,
            dir: 0,
            canEat: false
        };

        scope.units.forEach(function (unit) {
            if (unit.type === 'player') {
                unit.size -= unit.blows_factor * unit.size ;
                unit.around = [];
                scope.units.forEach(function (item) {
                    if (unit !== item) {
                        var delta = item.position.subtract(unit.position);
                        if (delta.length <= unit.radius + item.size) {
                            var n = Object.create(neighbour);
                            n.type = item.type;
                            n.size = item.size;
                            n.dist = delta.length;
                            n.dir = delta.angle;
                            n.canEat = item.size < unit.size && delta.length <= unit.size + item.size;
                            if (n.canEat) {
                                unit.size += item.size;
                                if (item.type === 'player') {
                                    item.kick('eaten');
                                }
                                world.remove(item);
                            } else {
                                unit.around.push(n);
                            }
                        }
                    }
                });
                unit.move();
            }
        });
        return scope.units;
    },
    player: {
        position: [0, 0],
        size: 10,
        max_size: 100,
        min_size: 1,
        radius: 10,
        speed: 1,
        accelerate_factor: 0.01,
        angle_delta: 10,
        max_speed: 5,
        min_speed: 0,
        speed_rate: 10,
        direction: 0,
        radius_factor: 1.5,
        disabled: false,
        around: [],
        random: false,
        blows_factor: 0.0001,
        //suicide_time: 500,
        suicide_factor: 0.1
    },
    food: {
        position: [0, 0],
        size: 5,
        radius: 5,
        speed: 0.2,
        accelerate: 0,
        angle_delta: 10,
        max_speed: 3,
        min_speed: 0,
        direction: 0,
        speed_rate: 10,
        disabled: false,
        random: false
    },
    wall: {}
};