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
    $scope.sad = false;

    function compare(a,b) {
      if (a.seconds < b.seconds) { return -1; }
      if (a.seconds > b.seconds) { return 1; }
      return 0;
    }

    var validateData = function (data) {
      if (!angular.isArray(data.predictions.direction[0].prediction)) {
        data.predictions.direction[0].prediction = [data.predictions.direction[0].prediction];
      }
      if (!angular.isArray(data.predictions.direction[1].prediction)) {
        data.predictions.direction[1].prediction = [data.predictions.direction[1].prediction];
      }
    };

    var getWestboundInfo = function() {
      $http.get('http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=512&s=14395').
        success(function(data) {
          
          // Check for arrays...
          var cars = null;
          if (angular.isArray(data.predictions.direction)) {
            // Check data is ok
            validateData(data);
            
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
            if (i === 4) { break; }
            $scope.streetcarsWestbound.push(cars[i].seconds.toHHMMSS());
          }

          switchViews();
        }).
        error(function(data) {
          console.log(data);
        });
    };

    var getEastboundInfo = function() {
      $http.get('http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=512&s=14388').
        success(function(data) {

          // Check for arrays...
          var cars = null;
          if (angular.isArray(data.predictions.direction)) {
            // Check data is ok
            validateData(data);

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
            if (i === 4) { break; }
            $scope.streetcarsEastbound.push(cars[i].seconds.toHHMMSS());
          }

          switchViews();
        }).
        error(function(data) {
          console.log(data);
        });
    };

    var switchViews = function() {
      $scope.sad = !$scope.sad;
      $scope.happy = !$scope.happy;
    };

    getEastboundInfo();
    var heading = false;
    /**
     * Our main loop
     * Perform main application logic
     **/
    setInterval(function() {
      if (heading) {
        getEastboundInfo();
      } else {
        getWestboundInfo();
      }
      heading = !heading;
    }, 8000);

  });
