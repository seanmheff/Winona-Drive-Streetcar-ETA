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
  	$scope.nextStreetcarWestbound = "0:34"
    $scope.streetcarsWestbound = [
    	"1:21",
    	"2.23",
    	"7:59"
    ];
  });
