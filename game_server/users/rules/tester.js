'use strict';

var make_world = require('../../engine/world/make_world.js');

var rule = {
    name: 'tester',
    init: function (storage, emit) {
        storage.code = '';
        storage.world = make_world();
        storage.world.on('start', function () {
            emit('tester-start', {
                yourID: storage.player.id
            })
        });
        storage.world.on('frame', function (data) {
            emit('tester-data', data);
        });
        storage.world.on('stop', function () {
            emit('tester-stop');
        });
    },
    ai: function (storage, emit, data) {
        if (!storage.scope.user.user) {
            return;
        }
        storage.code = data.content;
    },
    'tester-switch': function (storage, emit, data) {
        if (!storage.scope.user.user) {
            return;
        }
        if (storage.world.running) {
            storage.world.stop();
        } else {
            storage.world.clear();
            storage.player = storage.world.make_player();
            storage.player.move = storage.code;
            storage.player.on('remove', function () {
                storage.world.stop();
            });
            storage.world.start();
        }
    }
};

module.exports = rule;