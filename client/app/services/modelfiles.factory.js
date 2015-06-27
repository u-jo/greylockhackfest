'use strict';

angular.module('greylock20152App')
  .factory('modelFileService', function ($resource) {
    var modelFileResource = $resource('/api/model-files', {}, {
      uploadModel: {
        method: 'POST'
      }
    });

    return modelFileResource;
  });
