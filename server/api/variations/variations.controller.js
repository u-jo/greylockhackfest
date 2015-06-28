'use strict';

var _ = require('lodash');
var Variation = require('./variation.model');
var Experiment = require('../experiment/experiment.model');
var multiparty = require('multiparty');
var JSZip = require('jszip');
var fs = require('fs');
var async = require('async');

exports.index = function(req, res) {
  Variation.find({experimentId: req.experiment._id})
  .populate('reports')
  .exec(function(err, variations) {
    if (err) { return handleError(res, err); }
    return res.json(200, variations);
  });
};

exports.show = function(req, res) {
  Variation.findById(req.params.id)
    .populate('reports')
    .exec(function (err, variation) {
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
      var dataFolders = zip.folder(/_Data\/$/);
      if (_.isEmpty(dataFolders)) {
        return res.json(500, {
          message: 'could not inject data into resources folder'
        });
      }
      var folder = dataFolders[0].name;
      var genFilePath = function(filename) {
        return [folder, filename].join('/')
      };
      zip.file(genFilePath('variation-info'), JSON.stringify(variation));
      var userOwned = req.user && req.user._id.equals(variation.userId);
      if (userOwned && variation.data) {
        _.each(_.keys(variation.data), function(key) {
          zip.file(genFilePath(key), variation.data[key])
        });
      }
      zip.file(genFilePath('mode'), userOwned ? 'client' : 'user');
      var out = zip.generate({type: 'string'});
      return res.send(new Buffer(out, 'binary'));
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

exports.update = function(req, res, next) {
  if(req.body._id) { delete req.body._id; }
  Variation.findById(req.params.id, function (err, variation) {
    if (err) { return handleError(res, err); }
    if (!variation) { return res.send(404); }
    var updated = _.merge(variation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, variation);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
