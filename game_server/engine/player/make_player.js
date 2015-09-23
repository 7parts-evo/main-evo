'use strict';

var _ = require('underscore');
var utils = require('../../utils/utils.js');
var default_player = require('./default_player.js');
var make_runner = require('./make_runner.js');

var proto = {
    get type() { return 'player'},
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
        if (this.world && this.world.preferences.debug) {
            res.around = this.around;
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

module.exports = function make_player(id, preferences) {
    var world = this;
    preferences = _.extend({}, default_player, world.preferences.player, preferences);
    var player = _.extend(Object.create(proto), preferences);
    player.world = world;
    utils.events_mixin(player);

    if (player.random) {
        player.position = utils.random_point([world.preferences.width, world.preferences.height]);
        player.direction = utils.random_int(0, 360);
    } else {
        player.position = utils.make_point(player.position);
    }
    player.__defineGetter__('id', function () { return id; });
    player.__defineGetter__('accelerate', function () {
        return player.accelerate_factor / player.size;
    });
    player.__defineGetter__('tick',function(){
        return world.tick;
    });
    player.__defineGetter__('radius', function () { return player.size * player.radius_factor; });

    var _suicide = false;
    var _size = player.size;
    player.__defineSetter__('size', function (s) {
        if (s < player.min_size) {
            if (_suicide) {
                player.kick('suicide');
            } else {
                player.kick('die');
            }
        }
        if (s > player.max_size) {
            player.kick('fat');
        }
        _size = s;
    });
    player.__defineGetter__('size', function () {
        return _size;
    });

    player.kick = function (reason) {
        player.trigger(reason);
        player.remove(player);
        console.log('kick: ' + reason);
    };

    player.suicide = function () {
        if (_suicide) {
            return;
        }
        _suicide = true;
        player.blows_factor = player.suicide_factor;
    };

    var self_arg = {
        get size() { return player.size; },
        set size(s) { player.size = s;},

        get direction() { return player.direction; },
        set direction(d) {
            if (!_.isNumber(d)) {
                throw new Error();
            }
            player.lastDirection = player.direction;
            player.direction = d;
        },

        get speed() { return player.speed; },
        set speed(s) {},

        get tick() { return world.tick; },
        set tick(t) {},

        gen_json: function () {
            return JSON.parse(JSON.stringify(this));
        },
        apply_json: function (json) {
            var self = this;
            Object.keys(json).forEach(function (key) {
                self[key] = json[key];
            });
        }
    };

    var runner = make_runner();
    runner.state = -1;
    runner.on('log', function (data) {
        console.log(data);
    });
    runner.on('start', function (data) {
        runner.state = 0;
    });
    runner.on('finish', function (data) {
        runner.state = 1;
        try {
            self_arg.apply_json(data.self_arg);
        } catch (e) {
            runner.trigger('error', e);
        }
    });
    runner.on('error', function (data) {
        runner.state = -1;
        player.kick('crash');
    });
    runner.on('timeout', function () {
        runner.terminate();
        player.kick('timeout');
    });

    world.on('frame', function () {
        if (runner.state === 0) {
            runner.trigger('timeout');
        }
    });

    player.__defineSetter__('move', function (move) {
        if (move) {
            runner.code = move;
        }
    });
    player.__defineGetter__('move', function () {
        return function () {
            runner.run({
                self_arg: self_arg.gen_json(),
                around: player.around
            });
        };
    });

    return player;
};