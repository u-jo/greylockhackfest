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
      	url: '/create',
      	templateUrl: 'app/merchant/create_experiment/merchant_create_experiment.html',
        controller: 'MerchantCreateCtrl'
      })
  });