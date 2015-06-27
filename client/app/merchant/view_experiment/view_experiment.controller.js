'use strict';

angular.module('greylock20152App')
  .controller('MerchantViewExperimentsCtrl', function ($scope, Auth, Upload, $stateParams, experimentService) {
    experimentService.getDocument().$promise.then(function(data) {
      $scope.experiments = data;
    });
  });
