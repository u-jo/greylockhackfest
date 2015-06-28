'use strict';

angular.module('greylock20152App')
  .controller('MerchantViewExperimentsCtrl', function ($scope, Auth, Upload, $state, $stateParams, experimentService) {
    $scope.searchTerm = '';
    experimentService.getDocument().$promise.then(function(data) {
      $scope.experiments = data;
    });

    $scope.inspectExperiment = function(id) {
    	$state.go('merchant.inspect', {
    		id: id
    	});
    };	
  });

