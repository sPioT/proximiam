// js/proximiam.js
'use strict';


/**
 * Déclaration de l'application ProxiMiamApp
 */
var proxiMiamApp = angular.module('proxiMiamApp', [
    // Dépendances du "module"
    'eventList','timer','ui.bootstrap','connection'
]);

/**
 * Déclaration du module eventList
 */
var eventList = angular.module('eventList',[]);
var connection = angular.module('connection',[]);

/**
 * Contrôleur de l'application "ProxiaMiam"
 */

eventList.controller('EventController',
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
        	if (user==undefined || userArray==undefined || userArray.length<1){
        		return false;
        	}

        	for (var i=0 ; i < userArray.length ; i++){
        		if (user.id == userArray[i].id) {
        			return true;
        		}
        	}
        	return false;
        }

        var refreshOn = false;

        $scope.refresh = function(){
            if (!refreshOn){
                refreshOn = true;
                $http.get('../json/agenda.json?t='+new Date()).success(function(data){
                    $scope.agenda = data;
                });
                refreshOn = false;
            }
        }

        $scope.refresh();


        $scope.callbackTimer = function(event){
            if (!refreshOn){
                setTimeout( function()
                {
                    $scope.$apply();
                }, 1000 );
            }
        }

    }

    

);

connection.controller('MenuController',
    function ($rootScope,$scope,$uibModal) {

        $scope.connect = function(){

		 	//Ouverture de la fenêtre
		 	var dialogOpts = {
		 		templateUrl : 'partial/connection.html',
		 		controller : 'ModalConnectionController'
		 	};
			
			var modalInstance = $uibModal.open(dialogOpts);

			modalInstance.result.then(function (user){
				$rootScope.user = user;
			});
        }
    }    

);

connection.controller('ModalConnectionController',
	function ($scope, $uibModalInstance,$http) {
		$scope.connection = function(){
			$scope.resultat = '';
			$http.get('../json/user.json?t='+new Date()).success(
				function(user){
					if (user.id !=""){
                		$uibModalInstance.close(user);
                	} else{
                		$scope.resultat="Hum... Il doit y avoir une erreur de frappe.";
                	}
            });
		}

		$scope.switchAccountForm = function(){
			$scope.resultat = '';
			$scope.newAccount=true;
		}

		$scope.createAccount = function(){
			$scope.resultat = '';
			if ($scope.identifiants.password != $scope.identifiants.password2){
				$scope.resultat="Les deux mots de passe ne correspondent pas";
			}

		}
	}
);