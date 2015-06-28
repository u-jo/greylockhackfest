'use strict';

angular.module('greylock20152App')
  .controller('MerchantCreateCtrl', function ($scope, Auth, Upload, experimentService, $q, $state) {
    $scope.experiments = [];
    $scope.currentUser = Auth.getCurrentUser();
    $scope.experiment = {
      name: ''
    }

    $scope.heatMap2D = {
      name: 'Create 2D Heat Map',
      metricDescription: '2D Heat Map',
      tracking: true
    };
    $scope.heatMap3D = {
      name: 'Create 3D Heat Map',
      metricDescription: '3D Heat Map',
      tracking: true
    };
    $scope.trackGoal = {
      name: 'Track time taken',
      metricDescription: 'Time tracked',
      tracking: false,
      description: ''
    };
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
        description: $scope.experiment.description,
        metrics: {
          heatmap2d: $scope.heatMap2D,
          heatmap3d: $scope.heatMap3D,
          trackGoal: $scope.trackGoal
        }
      }, function(experiment) { 
        var experimentId = experiment._id;
        $scope.upload($scope.experiments, experimentId);
      });
    };

    $scope.upload = function(variations, experimentId) {
      var masterPromise = [],
          url = '/api/experiments/' + experimentId + '/variations'
      $scope.experiments.forEach(function(experiment) {
        var file = experiment.file[0],
            name = experiment.name,
            description = experiment.description;
        var deferred = $q.defer();
        masterPromise.push(deferred);
        if (name && file) {
          Upload.upload({
            url: url,
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
            deferred.resolve();
          });
        }
      });

      $q.all(masterPromise).then(function() {
        $state.go('merchant.viewall');
      });
    };
  });
