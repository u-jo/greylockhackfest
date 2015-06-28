'use strict';

angular.module('greylock20152App')
  .controller('MerchantInspectExpCtrl', function ($scope, Auth, Upload, experimentService, $q, $stateParams) {
    experimentService.getExperiment({
      id: $stateParams.id
    }, function(experiment) {
      $scope.experiment = experiment;
      $scope.variations = $scope.experiment.variations;
      $scope.variations = $scope.variations.map(function(variation) {
        var url = '/api/experiments/' + variation.experimentId + '/variations/' + variation._id + '/download';
        var fullUrl = 'localhost:9000/' + url;
        variation.url = url;
        variation.fullUrl = url;
        return variation;
      });


      $scope.metrics = Object.keys(experiment.metrics).filter(function(metricKey) {
      	var metric = experiment.metrics[metricKey];
      	return metric.tracking;
      }).map(function(metricKey) {
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
