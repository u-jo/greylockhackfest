'use strict';

angular.module('greylock20152App')
  .controller('MerchantUpdateCtrl', function ($scope, Auth, Upload, $stateParams) {
    console.log($stateParams);
    $scope.experiments = [];
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
      $scope.upload($scope.experiments);
    };

    $scope.upload = function(variations) {
      $scope.experiments.forEach(function(experiment) {
        var file = experiment.file[0],
            name = experiment.name,
            description = experiment.description;
        Upload.upload({
          url: '/api/variations',
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
      });
    };
  });
