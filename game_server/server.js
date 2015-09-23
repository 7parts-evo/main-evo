'use strict';

var io = require('socket.io').listen(8888);
var connections = require('./users/connections.js');
//var profile = require('nodetime').profile({
//    accountKey: 'cf846112011f08b491fb61d6d6161847fa3fcf55',
//    appName: 'evolution'
//});
io.sockets.on('connection', function (socket) {
    connections.bind_socket(socket);
});