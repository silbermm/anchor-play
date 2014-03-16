'use strict';
angular.module('menuCollapseService', []).factory('menuCollapseService', function(){
    var collapsed = {val : true};
    return {
       setCollapsed : function(s){
        collapsed.val = s;
       },
       getCollapsed : function(){
        return collapsed;
       }
    }
})

