'use strict';

angular.module('greylock20152App')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $timeout) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'role': 'user'
    }, {
      'title': 'View Experiments',
      'link': '/merchant/experiments',
      'role': 'merchant'
    }, {
      'link': '/merchant/experiments/create',
      'title': 'Create Experiment',
      'role' : 'merchant'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.user = $scope.getCurrentUser();
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };


    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });