'use strict';

angular.module('greylock20152App')
  .controller('MerchantInspectExpCtrl', function ($scope, Auth, Upload, experimentService, $q, $stateParams) {
    experimentService.getDocument({
      _id: $stateParams.id
    }, function(experiment) {
      $scope.experiment = experiment[0];
    });

    
  });
