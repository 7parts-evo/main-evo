(function () {
    var app = angular.module('main-app',
        ['shared', 'connection-service', 'tester-app', 'play-app']);
    app.controller('MainController', ['$scope', 'shared', 'ConnectionService', function ($scope, shared, ConnectionService) {
        shared.state = 'loading';
        $scope.shared = shared;
        ConnectionService.connect(document.game_host, function () {
            ConnectionService.on('state', function (data) {
                shared.state = data;
                $scope.$apply();
            });
            ConnectionService.on('tutorial_state', function(data){
                shared.tutorial_state = data;
                $scope.$apply();
            });
            //ConnectionService.sendEvent('secret', document.secret);
            ConnectionService.sendEvent('login',
                {
                    secret: document.secret,
                    type: 'main'
                }
            );
        });
    }]);
})();