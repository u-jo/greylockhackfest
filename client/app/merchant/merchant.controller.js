'use strict';

angular.module('greylock20152App')
  .controller('MerchantCtrl', function ($scope) {
    $scope.$watch('modelFiles', function() {
      $scope.upload($scope.modelFiles);
    });

    $scope.upload = function(files) {
      if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
              var file = files[i];
              console.log(file);
              // Upload.upload({
              //     url: 'upload/url',
              //     fields: {'username': $scope.username},
              //     file: file
              // }).progress(function (evt) {
              //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              //     console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
              // }).success(function (data, status, headers, config) {
              //     console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
              // });
          }
      }
    };
  });
