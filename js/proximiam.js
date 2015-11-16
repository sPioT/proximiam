// js/proximiam.js
'use strict';


/**
 * Déclaration de l'application ProxiMiamApp
 */
var proxiMiamApp = angular.module('proxiMiamApp', [
    // Dépendances du "module"
    'eventList','timer','menu'
]);

/**
 * Déclaration du module eventList
 */
var eventList = angular.module('eventList',[]);
var menu = angular.module('menu',[]);

/**
 * Contrôleur de l'application "ProxiaMiam"
 */

eventList.controller('eventCtrl',
    function ($rootScope,$scope,$http,$filter) {

        $scope.isToday = function(dt){
            $scope.NewDt=$filter('date')(dt, 'shortDate');
            $scope.currentDate = $filter('date')(new Date(), 'shortDate');
            return $scope.NewDt==$scope.currentDate;
        }

        $scope.isPassed = function(dt){
            $scope.NewDt=$filter('date')(dt, 'yyyyMMddHHmmss');
            $scope.currentDate = $filter('date')(new Date(), 'yyyyMMddHHmmss');

            if ( $scope.currentDate > $scope.NewDt) {
                return true;
            }
        }

        $scope.isIn = function(user,userArray){
        	if (user == undefined || userArray == undefined || userArray.length==0){
        		return false;
        	}

        	for (var i=0 ; userArray.length ; i++){
        		if (userArray[i].id == user.id) {
        			return true;
        		}
        	}
        	return false;
        }

        $scope.refresh = function(){
            $http.get('../json/agenda.json?t='+new Date()).success(function(data){
                $scope.agenda = data;
            });
        }

        $scope.refresh();
    }

    

);

menu.controller('menuCtrl',
    function ($rootScope,$scope,$http,$filter) {

        $scope.connect = function(){
            $http.get('../json/user.json?t='+new Date()).success(function(user){
                $rootScope.user = user;
            });
        }
    }    

);