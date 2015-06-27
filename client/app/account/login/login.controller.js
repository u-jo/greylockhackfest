'use strict';

angular.module('greylock20152App')
  .controller('LoginCtrl', function ($scope, Auth, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $state.go('merchant');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
