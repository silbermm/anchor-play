'use strict';
angular.module('navCollapseService', []).factory('navCollapseService', function(){
    var collapsed = {val : true};
    return {
       setCollapsed : function(s){
        collapsed.val = s;
       },
       getCollapsed : function(){
        return collapsed;
       }
    };
});
