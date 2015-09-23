(function () {
    var app = angular.module('tester-app', ['shared', 'connection-service']);
    var editor = null;
    app.controller('TesterController', ['$scope', 'shared', 'ConnectionService', function ($scope, shared, ConnectionService) {
        this.testerRunning = false;
        var self = this;
        ConnectionService.on('tester-start', function (data) {
            self.testerRunning = true;
            shared.testerID = data.yourID;
            $scope.$apply();
        });
        ConnectionService.on('tester-data', function (data) {
            if (document.renderer) {
                document.renderer.render(data);
            }
        });
        ConnectionService.on('tester-stop', function () {
            self.testerRunning = false;
            $scope.$apply();
        });
        this.run = function () {
            ConnectionService.sendEvent('ai', {
                lang: 'javascript',
                content: editor.getValue()
            });
            ConnectionService.sendEvent('tester-switch');
        };
        this.play = function () {
            ConnectionService.sendEvent('ai', {
                lang: 'javascript',
                content: editor.getValue()
            });
            ConnectionService.sendEvent('play');
        };

        $scope.$watch(function () {
            return shared.state;
        }, function (newVal, oldVal) {
            if (oldVal !== 'tester' && newVal === 'tester') {
                document.renderer.setup(document.getElementById('tester-canvas'));
                //document.renderer.scrollOn();
            }
        });
    }]);
    app.directive('tester', function () {
        return {
            restrict: 'E',
            templateUrl: 'html/tester.html',
            link: function () {
                if (!editor) {
                    editor = document.createEditor();
                }
                //document.renderer.setup(document.getElementById('tester-canvas'));
            }
        }
    })
})();