'use strict';
angular.module('anchorotr', [  
    "templates-main",
    "ui.router",
    "ui.router.state",
    "ui.bootstrap",
    'angular-growl',
    "anchorotr.home",
    "anchorotr.about",
    "anchorotr.location",
    "anchorotr.menus",
    "anchorotr.reservation",
    "angulartics",
    "angulartics.google.analytics",
	"wu.masonry"
]).config(['$locationProvider','growlProvider','$stateProvider', '$urlRouterProvider',function($locationProvider,growlProvider,$stateProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    growlProvider.globalTimeToLive(5000);
    $urlRouterProvider.otherwise('/home');
}]).run(['titleService','authService','$rootScope','$state','$stateParams', function(titleService, authService, $rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    titleService.setSuffix(' | The Anchor-OTR');     
}]).controller('AppCtrl', ['$scope','titleService','menuCollapseService','authService','navCollapseService','$state','$modal','$http','$log','growl', function($scope,titleService,menuCollapseService,authService,navCollapseService,$state,$modal,$http,$log,growl){
	titleService.setTitle("Home");    
    $scope.isCollapsed = menuCollapseService.getCollapsed();
    $scope.isNavCollapsed = navCollapseService.getCollapsed();        
    authService.isAuthenticated().then(function(d){
       if(d.status === 200){
           $scope.isAuthenticated = true;
           $scope.username = d.data.username;
           $scope.isAdmin = true;
       } 
    });

    $scope.toggleMenu = function() {
        if ($state.includes('menus')) {
            menuCollapseService.setCollapsed(false);
        } else {
            menuCollapseService.setCollapsed(!menuCollapseService.getCollapsed().val);
        }
    }
    $scope.toggleNavMenu = function() {
        navCollapseService.setCollapsed(!navCollapseService.getCollapsed().val);
    }
    $scope.openMailModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'mailModal.html',
            controller: 'EmailModalInstanceCtrl',
            resolve: {
                items: function() {
                    return {
                        from: null,
                        message: null
                    }
                }
            }
        });
        modalInstance.result.then(function(mail) {
            $http.post("/mail", mail).success(function(data, status, headers, config) {
                $log.debug(data);
                $scope.openMailThanksModal();
            }).error(function(data, status, headers, config) {
                growl.addErrorMessage("There was a problem sending your message. Sorry for the inconvenience, please try again.")
            });
        });
    };
    
    $scope.openMailThanksModal = function(){
        var modalInstance = $modal.open({
            templateUrl: 'mailThanksModal.html',
            controller: 'EmailModalInstanceCtrl',   
            resolve: {
                items: function() {
                    return {
                        from: null,
                        message: null
                    }
                }
            }
        });        
        
    };
}]).controller('EmailModalInstanceCtrl',['$scope', '$modalInstance', 'items',function($scope,$modalInstance,items){	
    $scope.mail = items;
    $scope.ok = function() {
        $modalInstance.close($scope.mail);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}])
;





