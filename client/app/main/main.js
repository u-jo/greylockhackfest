'use strict';

angular.module('greylock20152App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
      	resolve: {
      		availableExperiments: function(experimentService) {
      			return experimentService.getDocument().$promise.then(function(experiments) {
      				return experiments;
      			});
      		}	
      	},
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });