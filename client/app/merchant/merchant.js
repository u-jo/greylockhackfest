'use strict';

angular.module('greylock20152App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('merchant', {
        url: '/merchant',
        templateUrl: 'app/merchant/merchant.html',
        controller: 'MerchantCtrl'
      })
      .state('merchant.create', {
      	url: '/experiments/create',
      	templateUrl: 'app/merchant/create_experiment/merchant_create_experiment.html',
        controller: 'MerchantCreateCtrl'
      })
      .state('merchant.update', {
      	url: '/experiments/update/:id',
      	templateUrl: 'app/merchant/update_experiment/merchant_update_experiment.html',
        controller: 'MerchantUpdateCtrl'
      })
      .state('merchant.view', {
      	url: '/experiments',
      	templateUrl: 'app/merchant/view_experiment/view_experiments.html',
        controller: 'MerchantViewExperimentsCtrl'
      });
  });