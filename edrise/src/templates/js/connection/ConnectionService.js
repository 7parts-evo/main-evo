(function () {
    var app = angular.module('connection-service', []);
    app.factory('ConnectionService', function () {
        var socket;
        var isConnected = false;
        return {
            connect: function (address, callback) {
                socket = io.connect(address);
                socket.on('connect', function () {
                    console.log('Connection accepted');
                    isConnected = true;
                    callback(true);
                });
                socket.on('disconnect', function () {
                    console.log('Connection closed');
                    isConnected = false;
                });
            },
            make_event: function (eventType, data) {
                return {
                    event: eventType,
                    data: data
                }
            },
            sendEvent: function (eventType, data) {
                socket.emit(eventType, data);
            },
            on: function (eventType, listener) {
                socket.on(eventType, listener);
            },
            get isConnected() { return isConnected; }
        }
    })
})();