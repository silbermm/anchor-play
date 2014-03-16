'use strict';
angular.module('anchorotr.reservation', [
    'ui.router.state',
    'titleService',
    'menuCollapseService',
    'ui.bootstrap',
    'navCollapseService',
]).config(['$stateProvider',function($stateProvider) {
    $stateProvider.state('reservation', {
        url: '/reservation',
        views: {
            "main": {
                controller: "ReservationCtrl",
                templateUrl: 'reservation/reservation.tpl.html'
            }
        }
    })
}]).controller('ReservationCtrl', ['$scope', 'titleService', 'menuCollapseService', 'navCollapseService','$timeout',function($scope, titleService, menuCollapseService, navCollapseService,$timeout) {
    titleService.setTitle("Reservations");
    navCollapseService.setCollapsed(true);
    menuCollapseService.setCollapsed(true);

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.showWeeks = false;
    $scope.toggleWeeks = function() {
        $scope.showWeeks = !$scope.showWeeks;
    };

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.toggleMin = function() {
        $scope.minDate = ($scope.minDate) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function() {
        $timeout(function() {
            $scope.opened = true;
        });
    };

}])
;
