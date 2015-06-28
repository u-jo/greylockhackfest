'use strict';

angular.module('greylock20152App')
  .controller('SignupCtrl', function ($scope, Auth, $location, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.roles = [{
      name: 'Merchant',
      value: 'merchant'
    }, {
      name: 'Tester',
      value: 'user'
    }];
    $scope.user.role = $scope.roles[0];

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          userRole: $scope.user.role.value
        })
        .then( function() {
          // Account created, redirect to home
          $state.go('merchant.viewall');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
