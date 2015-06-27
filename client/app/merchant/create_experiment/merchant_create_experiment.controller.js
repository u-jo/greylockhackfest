'use strict';

angular.module('greylock20152App')
  .controller('MerchantCreateCtrl', function ($scope, Auth, Upload, experimentService) {
    $scope.experiments = [];
    $scope.currentUser = Auth.getCurrentUser();
    $scope.experiment = {
      name: ''
    }
    $scope.addExperiment = function() {
      $scope.experiments.push({
        name: '',
        description: '',
        file: ''
      });
    };

    $scope.removeExperiment = function(index) {
      $scope.experiments.splice(index, 1);
    };
    $scope.addExperiment();

    $scope.createExperiments = function() {
      if (!$scope.experiment.name) {
        // TODO: show error
        return;
      } 
      experimentService.createDocument({
        name: $scope.experiment.name,
        userId: $scope.currentUser._id,
        description: ''
      }, function(experiment) { 
        var experimentId = experiment._id;
        $scope.upload($scope.experiments, experimentId);
      });
    };

    $scope.upload = function(variations, experimentId) {
      $scope.experiments.forEach(function(experiment) {
        var file = experiment.file[0],
            name = experiment.name,
            description = experiment.description;
        if (name && file) {
          Upload.upload({
            url: '/api/variations?experiment=' + experimentId,
            file: file,
            fields: {
              name: name,
              description: description
            }
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          });
        }
        
      });
    };
  });
