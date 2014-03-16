'use strict';
angular.module('pageLoadService', []).factory('pageLoadService', function() {
	var loaded = {val : false};	
	return {
		setLoaded : function(s){
			loaded.val = s;
		},
		isLoaded : function(){
			return loaded;
		}
	}
	
});