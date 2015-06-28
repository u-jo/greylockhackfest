'use strict';

var _ = require('lodash');
var Report = require('./report.model');
var multiparty = require('multiparty');
var async = require('async');
var Variation = require('../variations/variation.model');

// Get list of reports
exports.index = function(req, res) {
  Report.find(function (err, reports) {
    if(err) { return handleError(res, err); }
    return res.json(200, reports);
  });
};

// Get a single report
exports.show = function(req, res) {
  Report.findById(req.params.id, function (err, report) {
    if(err) { return handleError(res, err); }
    if(!report) { return res.send(404); }
    return res.json(report);
  });
};

// Creates a new report in the DB.
exports.create = function(req, res) {
  var form = new multiparty.Form({
    uploadDir: './uploads'
  });
  form.parse(req, function (err, fields, files) {
    if (err) return res.status(500).send(err);
    var missingFiles = _.filter(['file'], function(k) { return !(k in files); });
    if (!_.isEmpty(missingFiles)) {
      return res.json(400, {message: 'missing file'});
    }
    async.waterfall([
      function(cb) {
        Report.create({
          reportType: fields.reportType ? fields.reportType[0] : undefined,
          filename: files.file[0] ? files.file[0].path : '',
          variation: req.variation._id,
        }, function(err, report) {
          if(err) { return cb(err); }
          return cb(null, report);
        });
      },
      function(report, cb) {
        Variation.update({_id: req.variation._id}, {
          $push: {
            reports: report._id
          }
        }, function(err, variation) {
          if (err) return cb(err);
          return cb(null, report);
        });
      }
    ], function(err, report) {
      if (err) return res.json(500, {message: err});
      return res.json(201, report);
    });
  });
};

// Updates an existing report in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Report.findById(req.params.id, function (err, report) {
    if (err) { return handleError(res, err); }
    if(!report) { return res.send(404); }
    var updated = _.merge(report, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, report);
    });
  });
};

// Deletes a report from the DB.
exports.destroy = function(req, res) {
  Report.findById(req.params.id, function (err, report) {
    if(err) { return handleError(res, err); }
    if(!report) { return res.send(404); }
    report.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
