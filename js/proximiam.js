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
            $http.get('../json/agenda.json?t='+new Date()).success(function(data){
                $scope.agenda = data;
            });
        }

        $scope.refresh();
    }

    

);

menu.controller('menuCtrl',
    function ($scope,$http,$filter) {

        $scope.connect = function(){
            $http.get('../json/user.json?t='+new Date()).success(function(user){
                $scope.user = user;
            });
        }
    }    

);