'use strict';

var _ = require('lodash');
var Variation = require('./variation.model');
var Experiment = require('../experiment/experiment.model');
var multiparty = require('multiparty');
var JSZip = require('jszip');
var fs = require('fs');
var async = require('async');

exports.index = function(req, res) {
  Variation.find({experimentId: req.experiment._id}, function(err, variations) {
    if (err) { return handleError(res, err); }
    return res.json(200, variations);
  });
};

exports.show = function(req, res) {
  Variation.findById(req.params.id, function (err, variation) {
    if (err) { return handleError(res, err); }
    if (!variation) { return res.send(404); }
    return res.json(variation);
  });
};

exports.showFile = function(req, res) {
  Variation.findById(req.params.id, function (err, variation) {
    if (err) { return handleError(res, err); }
    if (!variation) { return res.send(404); }
    fs.readFile(variation.filename, function(err, data) {
      var zip = new JSZip(data);
      return res.send(zip.generate({type: 'blob'}));
    });
  });
};

exports.create = function(req, res, next) {
  var form = new multiparty.Form({
    uploadDir: './uploads'
  });

  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.status(500).send(err);
    }
    var missingFields = _.filter(['name'], function(k) {
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
    async.waterfall([
      function(cb) {
        var variation = new Variation({
          name: fields.name[0],
          description: fields.description[0],
          filename: files.file[0] ? files.file[0].path : '',
          userId: req.user.id,
          experimentId: req.experiment._id,
        });
        variation.save(function(err) {
          if (err) return cb(err);
          return cb(null, variation);
        });
      },
      function(variation, cb) {
        Experiment.update({_id: req.experiment._id}, {
          $push: {
            variations: variation._id
          }
        }, function(err, experiment) {
          if (err) return cb(err);
          return cb(null, variation);
        });
      }
    ], function(err, variation) {
      if (err) return res.send(500, err);
      return res.json(200, variation);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
