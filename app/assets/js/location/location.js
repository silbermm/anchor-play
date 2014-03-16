'use strict';
angular.module('anchorotr.location', [
    'ui.router.state',
    'titleService',
    'menuCollapseService',
    'navCollapseService',
]).config(['$stateProvider',function($stateProvider) {
    $stateProvider.state('location', {
        url: '/location',
        views: {
            "main": {
                controller: "LocationCtrl",
                templateUrl: 'location/location.tpl.html'
            }
        }
    })
}]).controller('LocationCtrl', ['$scope','titleService','menuCollapseService','navCollapseService',function($scope, titleService, menuCollapseService, navCollapseService) {
    titleService.setTitle("Location");
    navCollapseService.setCollapsed(true);
    $scope.isCollapsed = menuCollapseService.setCollapsed(true);

}])
;

