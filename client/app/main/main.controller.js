'use strict';

angular.module('greylock20152App')
  .controller('MainCtrl', function ($scope, $http, socket, availableExperiments, $timeout, $resource, Auth) {
    $scope.experiments = availableExperiments.map(function(experiment) {
      var numberOfVariations = experiment.variations.length;
      var variationNumber = Math.floor(Math.random() * numberOfVariations);
      var chosenVariation = experiment.variations[variationNumber];
      var url = '/api/experiments/' + experiment._id + '/variations/' + chosenVariation._id + '/download';
      var fullUrl = 'localhost:9000/' + url;
      experiment.url = url;
      experiment.fullUrl = url;
      var randomPicture = Math.floor(Math.random() * 3) + 1;
      experiment.picture = 'assets/images/' + randomPicture + '.jpg';
      return experiment;
    }).reverse();
    $scope.downloadExperiment = function(index) {
      // var experiment = $scope.experiments[index];
      // var downloadResource = $resource(experiment.url, {});
      // downloadResource.get().$promise.then(function() {
      // });
    }
  });
