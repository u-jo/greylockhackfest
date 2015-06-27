'use strict';

var _ = require('lodash');
var ModelFile = require('./model-file.model');
var multiparty = require('multiparty');

exports.index = function(req, res) {
  res.send(200);
};

exports.show = function(req, res) {
  res.send(200);
};

exports.create = function(req, res, next) {
  var form = new multiparty.Form({
    uploadDir: './uploads'
  });

  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.status(500).send(err);
    }
    var missingFields = _.filter(['name', 'description'], function(k) {
      return !(k in fields);
    });
    var missingFiles = _.filter(['file'], function(k) {
      return !(k in files);
    });
    if (!_.isEmpty(missingFields) || !_.isEmpty(missingFiles)) {
      var missing = missingFields.concat(missingFiles);
      return res.status(400).send({
        message: 'Missing fields: ' + missing.join(', ')
      });
    }
    var modelFile = new ModelFile({
      name: fields.name[0],
      description: fields.description[0],
      filename: files.file[0] ? files.file[0].path : '',
      userId: req.user.id,
    });
    modelFile.save(function(err) {
      if (err) res.send(500, err);
      return res.send(201);
    });
  });
};
