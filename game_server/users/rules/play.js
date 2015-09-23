'use strict';

var make_world = require('../../engine/world/make_world.js');
var utils = require('../../utils/utils.js');

var world = make_world({ width: 1280, height: 720});
world.start();

var rule = {
    ai: function (storage, emit, data) {
        if (!storage.scope.user.user.id || storage.inGame) {
            return;
        }
        storage.code = data.content;
    },
    play: function (storage, emit) {
        if (!storage.scope.user.user.id) {
            return;
        }
        storage.inGame = true;
        emit('state', 'play');
        storage.scope.tester.world.stop();
        var frame_listener = function (data) {
            emit('world-data', data);
        };
        world.on('frame', frame_listener);
        storage.world = world;
        storage.player = world.make_player({position: utils.random_point([world.preferences.width, world.preferences.height])});
        storage.player.move = storage.code;
        emit('world-id', storage.player.id);
        storage.player.on('remove', function () {
            world.off('frame', frame_listener);
            storage.player = null;
            storage.inGame = false;
            emit('state', 'tester');
        });
    },
    suicide: function (storage, emit) {
        storage.player.suicide();
    }
};

module.exports = rule;