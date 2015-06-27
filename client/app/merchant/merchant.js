'use strict';

angular.module('greylock20152App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('merchant', {
        url: '/merchant',
        templateUrl: 'app/merchant/merchant.html',
        controller: 'MerchantCtrl'
      });
  });