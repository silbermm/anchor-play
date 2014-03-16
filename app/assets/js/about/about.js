'use strict';
angular.module('anchorotr.about', [
    'ui.router.state',
    'titleService',
    'menuCollapseService',
    'navCollapseService',
    'authService',
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('about', {
        url: '/about',
        views: {
            "main": {
                controller: "AboutCtrl",
                templateUrl: 'about/about.tpl.html'
            }
        }
    })
}]).controller('AboutCtrl', ['$scope','titleService','menuCollapseService','navCollapseService','authService',function($scope, titleService, menuCollapseService,navCollapseService,authService) {
    titleService.setTitle("About Us");
    navCollapseService.setCollapsed(true);
    menuCollapseService.setCollapsed(true);
    
}])
;
