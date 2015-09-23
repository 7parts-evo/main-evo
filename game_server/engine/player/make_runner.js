'use strict';

var _ = require('underscore');
var utils = require('../../utils/utils.js');
var Worker = require('webworker-threads').Worker;
var move_worker = require('./move_worker.js');

var make_runner = function () {
    var worker = new Worker(move_worker);
    var runner = {
        set code(_code) {
            worker.postMessage({
                type: 'code',
                code: _code
            });
        },
        run: function (scope) {
            worker.postMessage({
                type: 'run',
                scope: scope
            });
        },
        terminate: function () {
            worker.terminate();
        }
    };
    utils.events_mixin(runner);

    worker.onmessage = function (event) {
        runner.trigger(event.data.type, event.data.data);
    };

    return runner;
};

module.exports = make_runner;