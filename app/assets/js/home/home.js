'use strict';
angular.module('anchorotr.home', [
    'ui.router.state',
    'titleService',
    'navCollapseService',
    'menuCollapseService',
    "angulartics.google.analytics"
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        views: {
            "main": {
                controller: "HomeCtrl",
                templateUrl: 'home/home.tpl.html'
            }
        }
    })
}]).controller('HomeCtrl', ['$scope','titleService','navCollapseService','menuCollapseService','$log','$http',function($scope, titleService, navCollapseService, menuCollapseService, $log, $http) {
	titleService.setTitle("Home");
    navCollapseService.setCollapsed(true);
    menuCollapseService.setCollapsed(true);
    $scope.images = new Array();           
    $scope.imagesLoaded = false;
    $http.get("/landing/imgs").success(function(data,status,config,other){
    	for(var i = 0; i< data.length; i++){
    		//$http.get(data[i]);
    		$scope.images.push(data[i]);    		
    	}    	 	
    	$scope.imagesLoaded = true;
    	
    }).error(function(data,status,config,other){
    	$log.error(data);
    });   
    
}])
;
