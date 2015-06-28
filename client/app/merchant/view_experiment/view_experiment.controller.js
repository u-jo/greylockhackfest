'use strict';

angular.module('greylock20152App')
  .controller('MerchantViewExperimentsCtrl', function ($scope, Auth, Upload, $stateParams, experimentService) {
    $scope.searchTerm = '';
    experimentService.getDocument().$promise.then(function(data) {
    	console.log(data);
      $scope.experiments = data;
    });
  });
