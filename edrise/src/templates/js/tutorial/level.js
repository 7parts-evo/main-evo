(function () {
    var app = angular.module('level-app', ['shared', 'connection-service']);
    var editor = null;
    app.controller('LevelController', ['$scope', 'shared', 'ConnectionService', function ($scope, shared, ConnectionService) {
        var self = this;
        self.levelRunning = false;
        ConnectionService.on('level-start', function (data) {
            self.levelRunning = true;
            $scope.$apply();
        });
        ConnectionService.on('level-data', function (data) {
            if (document.renderer) {
                document.renderer.render(data);
            }
        });
        ConnectionService.on('level-stop', function () {
            self.levelRunning = false;
            $scope.$apply();
        });
        this.run = function () {
            ConnectionService.sendEvent('tutorial_ai', {
                lang: 'javascript',
                content: editor.getValue()
            });
            ConnectionService.sendEvent('level-switch');
        };

        $scope.$watch(function () {
            return shared.tutorial_state;
        }, function (newVal, oldVal) {
            if (oldVal !== 'level' && newVal === 'level') {
                document.renderer.setup(document.getElementById('level-canvas'));
                //document.renderer.scrollOn();
            }
        });
    }]);
    app.directive('level', ['shared', function () {
        return {
            restrict: 'E',
            templateUrl: 'html/level.html',
            link: function () {
                if (!editor) {
                    editor = document.createEditor();
                }
                //document.renderer.setup(document.getElementById('tester-canvas'));
            }
        }
    }]);
})();