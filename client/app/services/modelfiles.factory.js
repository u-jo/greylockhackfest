'use strict';

angular.module('greylock20152App')
  .factory('variationService', function ($resource) {
    var variationResource = $resource('/api/variations', {}, {
      uploadModel: {
        method: 'POST',
        url: '/api/variations/:experimentId/variations'
      }
    });

    return variationResource;
  });
