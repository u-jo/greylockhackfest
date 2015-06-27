'use strict';

angular.module('greylock20152App')
  .factory('experimentService', function ($resource) {
    var experimentResource = $resource('/api/experiments', {}, {
      createDocument: {
        method: 'POST'
      }, 
      getDocument: {
      	method: 'GET',
        isArray: true
      }
    });

    return experimentResource;
  });
