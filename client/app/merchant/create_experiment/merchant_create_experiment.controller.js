'use strict';

angular.module('greylock20152App')
  .controller('MerchantCreateCtrl', function ($scope, Auth, Upload) {
    $scope.experiments = [];
    $scope.addExperiment = function() {
      $scope.experiments.push({
        name: '',
        description: '',
        file: ''
      });
    };

    $scope.removeExperiment = function(index) {
      //$scope.
    };
    $scope.addExperiment();

    $scope.createExperiments = function() {
      $scope.experiments.forEach(function(experiment) {
        console.log(experiment);
      });

      var files = $scope.experiments.map(function(experiment) {
        return experiment.file[0];
      });

      $scope.upload(files);
    };

    $scope.upload = function(files) {
      files.forEach(function(file) {
        Upload.upload({
          url: '/api/variations',
          file: file,
          fields: {
            name: file.name,
            description: 'file'
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
