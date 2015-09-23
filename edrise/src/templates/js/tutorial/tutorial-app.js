(function () {
    var app = angular.module('tutorial-app',
        ['shared', 'connection-service', 'level-app']);
    app.controller('TutorialController', ['$scope', 'shared', 'ConnectionService', function ($scope, shared, ConnectionService) {
        shared.tutorial_state = 'loading';
        $scope.shared = shared;
        ConnectionService.connect(document.game_host, function () {
            ConnectionService.on('tutorial_state', function(data){
                console.log("switch tutorial state from ", shared.tutorial_state, " to ", data);
                shared.tutorial_state = data;
                $scope.$apply();
            });

            ConnectionService.on('login-message', function(msg){
                    console.log(msg.type + " " + msg.content);
                }
            );

            //ConnectionService.sendEvent('secret', document.secret);
            ConnectionService.sendEvent('login',
                {
                    secret: document.secret,
                    type: 'tutorial'
                }
            );
            ConnectionService.sendEvent('level-start',
                {
                    chapter: 0,
                    level: 1
                }
            );
        });
    }]);
})();