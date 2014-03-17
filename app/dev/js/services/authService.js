'use strict';
angular.module('authService', []).factory('authService',['$http',function($http) {
    return {        
        isAuthenticated : function(){
            var promise = $http.get('/users/username').then(function(d){
              return d;
            });
            return promise;
        },
        isAdmin : function() {
            var promise = this.getRoles().then(function(d){
              if(d.status === 200){                
                return true;
              } else {
                return false;
              }
            });
            return promise;
        }
    };
}]);

