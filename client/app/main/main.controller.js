'use strict';

angular.module('greylock20152App')
  .controller('MainCtrl', function ($scope, $http, socket, availableExperiments, $timeout) {
    $scope.experiments = availableExperiments;

    $timeout(function() {
      $scope.experiments.unshift();
      $scope.$digest();
    }, 1000);
  });
