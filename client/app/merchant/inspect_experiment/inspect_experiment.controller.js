'use strict';

angular.module('greylock20152App')
  .controller('MerchantInspectExpCtrl', function ($scope, Auth, Upload, experimentService, $q, $stateParams) {
    experimentService.getExperiment({
      id: $stateParams.id
    }, function(experiment) {
      $scope.experiment = experiment;
      $scope.variations = $scope.experiment.variations;

      $scope.metrics = Object.keys(experiment.metrics).filter(function(metricKey) {
      	var metric = experiment.metrics[metricKey];
      	return metric.tracking;
      }).map(function(metricKey) {
      	console.log(metricKey);
      	return experiment.metrics[metricKey];
      });


    });







    $scope.selectedVariations = {
    	a: {},
    	b: {}
    };	
    $scope.selectedMetrics = {
    	a: {},
    	b: {}
    };	

    
  });
