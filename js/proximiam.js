// js/proximiam.js
'use strict';


/**
 * Déclaration de l'application ProxiMiamApp
 */
var proxiMiamApp = angular.module('proxiMiamApp', [
    // Dépendances du "module"
    'eventList','timer'
]);

/**
 * Déclaration du module eventList
 */
var eventList = angular.module('eventList',[]);

/**
 * Contrôleur de l'application "ProxiaMiam"
 */
eventList.controller('eventCtrl',
    function ($scope,$http,$filter) {

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

        $scope.refresh = function(){
        	$http.get('../json/agenda.json').success(function(data){
	           	$scope.agenda = data;
	       	});
        }

        $scope.refresh();
    }

    

);