'use strict';

/**
 * @ngdoc function
 * @name ttcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ttcApp
 */
angular.module('ttcApp')
	.controller('MainCtrl', function ($scope, $http) {

		$scope.happy = true;

		function compare(a,b) {
			if (a.seconds < b.seconds)
				 return -1;
			if (a.seconds > b.seconds)
				return 1;
			return 0;
		};

		var getWestboundInfo = function() {
			$http.get('http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=512&s=14395').
				success(function(data, status, headers, config) {

					// Check for arrays...
					var cars = null;
					if (angular.isArray(data.predictions.direction)) {
						cars = data.predictions.direction[0].prediction.concat(data.predictions.direction[1].prediction);

						// Sort arrays by closest time..
						cars.sort(compare);
					} else {
						cars = data.predictions.direction.prediction;
					}

					$scope.nextStreetcarWestbound = cars[0].seconds.toHHMMSS();
					$scope.streetcarsWestbound = [];

					for (var i=1; i<cars.length; i++) {
						// Show a max of 3
						if (i === 4) break;
						$scope.streetcarsWestbound.push(cars[i].seconds.toHHMMSS());
					}
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		};

		var getEastboundInfo = function() {
			$http.get('http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=512&s=14388').
				success(function(data, status, headers, config) {

					// Check for arrays...
					var cars = null;
					if (angular.isArray(data.predictions.direction)) {
						cars = data.predictions.direction[0].prediction.concat(data.predictions.direction[1].prediction);

						// Sort arrays by closest time..
						cars.sort(compare);
					} else {
						cars = data.predictions.direction.prediction;
					}

					$scope.nextStreetcarEastbound = cars[0].seconds.toHHMMSS();
					$scope.streetcarsEastbound = [];

					for (var i=1; i<cars.length; i++) {
						// Show a max of 3
						if (i === 4) break;
						$scope.streetcarsEastbound.push(cars[i].seconds.toHHMMSS());
					}
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		};

		var myTimer = function() {
			if($scope.happy === true){
				$scope.sad = true;
				$scope.happy = false;
			} else {
				$scope.sad = false;
				$scope.happy = true;
			}
		};

		// // Westbound tram
		getWestboundInfo();
		setInterval(getWestboundInfo, 10000);

		// Eastbound tram
		getEastboundInfo();
		setInterval(getEastboundInfo, 10000);

		// myTimer();
		setInterval(myTimer, 2000);

	});
