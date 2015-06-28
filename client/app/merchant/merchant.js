'use strict';

angular.module('greylock20152App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('merchant', {
        url: '/merchant',
        templateUrl: 'app/merchant/merchant.html',
        controller: 'MerchantCtrl',
        authenticate: true
      })
      .state('merchant.create', {
      	url: '/experiments/create',
      	templateUrl: 'app/merchant/create_experiment/merchant_create_experiment.html',
        controller: 'MerchantCreateCtrl',
        authenticate: true
      })
      .state('merchant.update', {
      	url: '/experiments/update/:id',
      	templateUrl: 'app/merchant/update_experiment/merchant_update_experiment.html',
        controller: 'MerchantUpdateCtrl',
        authenticate: true
      })
      .state('merchant.viewall', {
      	url: '/experiments',
      	templateUrl: 'app/merchant/view_experiment/view_experiments.html',
        controller: 'MerchantViewExperimentsCtrl',
        authenticate: true
      })
      .state('merchant.inspect', {
        url: '/experiments/:id',
        templateUrl: 'app/merchant/inspect_experiment/inspect_experiment.html',
        controller: 'MerchantInspectExpCtrl',
        authenticate: true
      });
  });