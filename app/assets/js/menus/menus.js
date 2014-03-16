'use strict';
angular.module('anchorotr.menus', [
    'ui.router.state',
    'titleService',
    'menuCollapseService',
    'authService',
    'angular-growl',
    'ui.bootstrap',
    'navCollapseService',
]).config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('menus', {
        url: '/menus/:id',
        views: {
            "main": {
                controller: "MenuCtrl",
                templateUrl: 'menus/menus.tpl.html'
            }
        }
    })
}]).controller('ModalInstanceCtrl', ['$scope','$modalInstance','items',function($scope, $modalInstance, items) {
    $scope.menuItem = items;
    $scope.ok = function() {
        $modalInstance.close($scope.menuItem);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]).controller('MenuCtrl', ['$scope','titleService','menuCollapseService','navCollapseService','authService','$stateParams','$modal','$http','$log','growl',function($scope, titleService, menuCollapseService, navCollapseService, authService, $stateParams, $modal, $http, $log, growl) {
    navCollapseService.setCollapsed(true);
    menuCollapseService.setCollapsed(false);
    
    $scope.openAddModal = function(currentCatagory) {
        var modalInstance = $modal.open({
            templateUrl: 'addModal.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
                    return {
                        menu: $scope.currentMenu,
                        catagory: currentCatagory,
                        price: null,
                        itemName: null,
                        itemDesc: null,
                        id: null,
                        weight: 1
                    }
                }
            }
        });
        modalInstance.result.then(function(menuItem) {
            $log.info(menuItem);
            // Create the Menu Item and add it to the correct menu
            $http.post('/menus/items', menuItem).success(function(data, status, headers, config) {
                menuItem['id'] = data.added;
                switch (menuItem.catagory) {
                    case "LUNCH SPECIAL":
                        $scope.lunchSpecial.push(menuItem);
                        break;
                    case "SPARKLING AND CHAMPAGNE":
                        $scope.sparklingWine.push(menuItem);
                        break;
                    case "ROSE":
                        $scope.roseWine.push(menuItem);
                        break;
                    case "RED":
                        $scope.redWine.push(menuItem);
                        break;
                    case "WHITE":
                        $scope.whiteWine.push(menuItem);
                        break;
                    case "SNACKS":
                        $scope.snacks.push(menuItem);
                        break;
                    case "SANDWICHES":
                        $scope.sandwiches.push(menuItem);
                        break;
                    case "APPETIZERS":
                        $scope.appetizers.push(menuItem);
                        break;
                    case "OYSTERS":
                        $scope.oysters.push(menuItem);
                        break;
                    case "COCKTAILS":
                        $scope.cocktailsCol2.push(menuItem);
                        break;
                    case "MAINS":
                        $scope.mainsCol2.push(menuItem);
                        break;
                    case "SIDES":
                        $scope.sides.push(menuItem);
                        break;
                    case "DAILY SPECIALS":
                        $scope.dailySpecials.push(menuItem);
                        break;
                    case "BEVERAGES":
                        $scope.beverages.push(menuItem);
                        break;
                     
                }
                growl.addSuccessMessage("Successfully added " + menuItem.itemName);
            }).error(function(data, status, headers, config) {
                $log.info("BOO! " + status + " " + data);
            });
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.openDeleteModal = function(menuItem, idx) {
        var modalInstance = $modal.open({
            templateUrl: 'deleteModal.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
                    return menuItem;
                }
            }
        });
        modalInstance.result.then(function(menuItem) {
            $log.info(menuItem);
            $http.delete("/menus/items/" + menuItem.id).success(function(data, status, headers, config) {
                $log.info("removed item with id: " + data.removed);
                switch (menuItem.catagory) {
                    case "LUNCH SPECIAL":
                        angular.forEach($scope.lunchSpecial, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.lunchSpecial);
                        break;
                    case "SPARKLING AND CHAMPAGNE":
                        angular.forEach($scope.sparklingWine, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.sparklingWine);
                        break;
                    case "ROSE":
                        angular.forEach($scope.roseWine, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.roseWine);
                        break;
                    case "RED":
                        angular.forEach($scope.redWine, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.redWine);
                        break;
                    case "WHITE":
                        angular.forEach($scope.whiteWine, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.whiteWine);
                        break;
                    case "SNACKS":
                        angular.forEach($scope.rawBar, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.snacks);
                        break;
                    case "SANDWICHES":
                        angular.forEach($scope.sandwiches, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.sandwiches);
                        break;
                    case "APPETIZERS":
                        angular.forEach($scope.appetizers, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.appetizers);
                        break;
                    case "OYSTERS":
                        angular.forEach($scope.oysters, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.oysters);
                        break;
                    case "COCKTAILS":
                        angular.forEach($scope.cocktailsCol1, function(val, key) {
                            if (val.id === menuItem.id) {
                                this.splice(key, 1);
                            }
                        }, $scope.cocktailCol1);
                        angular.forEach($scope.cocktailsCol2, function(val, key) {
                            if (val.id === menuItem.id) {
                                this.splice(key, 1);
                            }
                        }, $scope.cocktailCol2);
                        break;
                    case "MAINS":
                        angular.forEach($scope.mainsCol1, function(val, key) {
                            if (val.id === menuItem.id) {
                                this.splice(key, 1);
                            }
                        }, $scope.mainsCol1);
                        angular.forEach($scope.mainsCol2, function(val, key) {
                            if (val.id === menuItem.id) {
                                this.splice(key, 1);
                            }
                        }, $scope.mainsCol2);
                        break;
                    case "SIDES":
                        angular.forEach($scope.sides, function(val, key) {
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");
                            if (menuItem.id === val.id) {
                                this.splice(key, 1);
                                return;
                            }
                        }, $scope.sides);
                        break;
                    case "DAILY SPECIALS":
                        angular.forEach($scope.dailySpecials, function(val,key){
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");                             
                            if(menuItem.id === val.id){                              
                               this.splice(key, 1);
                               return;
                            }
                        }, $scope.dailySpecials);
                        break;
                    case "BEVERAGES":
                        angular.forEach($scope.beverages, function(val,key){
                            $log.debug("val = " + val + ", key = " + key);
                            $log.debug("does " + menuItem.id + " = " + val.id + "?");                             
                            if(menuItem.id === val.id){                              
                               this.splice(key, 1);
                               return;
                            }
                        }, $scope.beverages);
                        break;
                }
                growl.addSuccessMessage("Successfully deleted " + menuItem.itemName);
            }).error(function(data, status, headers, config) {
                growl.addErrorMessage("Something went wrong trying to delete " + menuItem.itemName);
            });
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.openEditModal = function(menuItem, idx) {
        $scope.editIdx = idx;
        var modalInstance = $modal.open({
            templateUrl: 'editModal.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
                    return menuItem;
                }
            }
        });
        modalInstance.result.then(function(menuItem) {
            $log.info(menuItem);
            $http.put("/menus/items", menuItem).success(function(data, status, headers, config) {
                $log.info("updated item with id: " + data.updated);
                switch (menuItem.catagory) {
                    case "LUNCH SPECIAL":
                        angular.forEach($scope.lunchSpecial, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.lunchSpecial);
                        break;
                    case "SPARKLING AND CHAMPAGNE":
                        angular.forEach($scope.sparklingWine, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.sparklingWine);
                        break;
                    case "ROSE":
                        angular.forEach($scope.roseWine, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.roseWine);
                        break;
                    case "RED":
                        angular.forEach($scope.redWine, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.redWine);
                        break;
                    case "WHITE":
                        angular.forEach($scope.whiteWine, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.whiteWine);
                        break;
                    case "SNACKS":
                        angular.forEach($scope.rawBar, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.snacks);
                        break;
                    case "SANDWICHES":
                        angular.forEach($scope.sandwiches, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.sandwiches);
                        break;
                    case "APPETIZERS":
                        angular.forEach($scope.appetizers, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.appetizers);
                        break;
                    case "OYSTERS":
                        angular.forEach($scope.oysters, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.oysters);
                        break;
                    case "COCKTAILS":
                        angular.forEach($scope.cocktailsCol1, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                            }
                        }, $scope.cocktailCol1);
                        angular.forEach($scope.cocktailsCol2, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                            }
                        }, $scope.cocktailCol2);
                        break;
                    case "MAINS":
                        angular.forEach($scope.mainsCol1, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                            }
                        }, $scope.mainsCol1);
                        angular.forEach($scope.mainsCol2, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                            }
                        }, $scope.mainsCol2);
                        break;
                    case "SIDES":
                        angular.forEach($scope.sides, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.sides);
                        break;
                    case "DAILY SPECIALS":
                        angular.forEach($scope.dailySpecials, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.dailySpecials);
                        break;
                    case "BEVERAGES":
                        angular.forEach($scope.beverages, function(val, key) {
                            if (val.id === menuItem.id) {
                                this[key] = menuItem;
                                return;
                            }
                        }, $scope.beverages);
                        break;
                }
                growl.addSuccessMessage("Successfully updated " + menuItem.itemName);
            }).error(function(data, status, headers, config) {
                growl.addErrorMessage("Unable to update " + menuItem.itemName);
                $log.info("failed to remove: " + data.error);
            });
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    if ($stateParams.id === 'dinner') {
        $scope.currentMenu = 2;
        titleService.setTitle("Dinner Menu");
        $http.get('/menus/2/SNACKS').success(function(data, status, headers, config) {
            $scope.snacks = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });

        $http.get('/menus/2/SANDWICHES').success(function(data, status, headers, config) {
            $scope.sandwiches = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });

        $http.get('/menus/2/APPETIZERS').success(function(data, status, headers, config) {
            $scope.appetizers = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });

        $http.get('/menus/2/OYSTERS').success(function(data, status, headers, config) {
            $scope.oysters = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });

        $http.get('/menus/2/SIDES').success(function(data, status, headers, config) {
            $scope.sides = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });

        $http.get('/menus/2/DAILY%20SPECIALS').success(function(data, status, headers, config) {
            $scope.dailySpecials = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });

        $http.get('/menus/2/MAINS').success(function(data, status, headers, config) {
            $scope.mainsCol1 = new Array();
            $scope.mainsCol2 = new Array();
            var half = data.length / 2;
            var leftover = data.length % 2;
            var firstColumn = half + leftover;
            for (var i = 0; i < data.length; i++) {
                if (i + 1 <= firstColumn) {
                    $scope.mainsCol1.push(data[i]);
                } else {
                    $scope.mainsCol2.push(data[i]);
                }
            }
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        })
        $scope.showWarning = true;
    }

    if ($stateParams.id == 'wine') {
        $scope.currentMenu = 3;
        titleService.setTitle("Wine Menu");
        $http.get('/menus/3/WHITE').success(function(data, status, headers, config) {
            $scope.whiteWine = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });

        $http.get('/menus/3/ROSE').success(function(data, status, headers, config) {
            $scope.roseWine = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });

        $http.get('/menus/3/RED').success(function(data, status, headers, config) {
            $scope.redWine = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });

        $http.get('/menus/3/SPARKLING%20AND%20CHAMPAGNE').success(function(data, status, headers, config) {
            $scope.sparklingWine = data;
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });
    }

    if ($stateParams.id == 'cocktails') {
        $scope.currentMenu = 4;
        titleService.setTitle("House Cocktails");
        $http.get('/menus/4').success(function(data, status, headers, config) {
            $scope.cocktailsCol1 = new Array();
            $scope.cocktailsCol2 = new Array();
            var half = data.length / 2;
            var leftover = data.length % 2;
            var firstColumn = half + leftover;
            for (var i = 0; i < data.length; i++) {
                if (i + 1 <= firstColumn) {
                    $scope.cocktailsCol1.push(data[i]);
                } else {
                    $scope.cocktailsCol2.push(data[i]);
                }
            }
        }).error(function(data, status, headers, config) {
            console.log(status + " " + data);
        });
    }

    if ($stateParams.id == 'happyHour') {
        titleService.setTitle("Happy Hour");
        $scope.happyHour = true;
    }

}]);

