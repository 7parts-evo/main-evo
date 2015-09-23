(function () {
    var app = angular.module('play-app', ['shared', 'connection-service']);

    app.controller('PlayController', ['$scope', 'shared', 'ConnectionService', function ($scope, shared, ConnectionService) {
        $scope.$watch(function () {
            return shared.state;
        }, function (newVal, oldVal) {
            if (oldVal !== 'play' && newVal === 'play') {
                document.renderer.setup(document.getElementById('play-canvas'));
                document.renderer.scrollOn();
            }
        });
        ConnectionService.on('world-id', function (data) {
            shared.worldId = data;
        });
        ConnectionService.on('world-data', function (data) {
            data.meId = shared.worldId;
            if (document.renderer) {
                document.renderer.render(data);
            }
        });
        this.suicide = function () {
            ConnectionService.sendEvent('suicide')
        }
    }]);

    app.directive('play', function () {
        return {
            restrict: 'E',
            templateUrl: 'html/play.html'
        }
    })
})();