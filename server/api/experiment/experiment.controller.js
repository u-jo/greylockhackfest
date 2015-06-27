'use strict';

var _ = require('lodash');
var Experiment = require('./experiment.model');

// Get list of experiments
exports.index = function(req, res) {
  Experiment.find(function (err, experiments) {
    if(err) { return handleError(res, err); }
    return res.json(200, experiments);
  });
};

// Get a single experiment
exports.show = function(req, res) {
  Experiment.findById(req.params.id, function (err, experiment) {
    if(err) { return handleError(res, err); }
    if(!experiment) { return res.send(404); }
    return res.json(experiment);
  });
};

// Creates a new experiment in the DB.
exports.create = function(req, res) {
  Experiment.create({
    name: req.body.name,
    description: req.body.description,
    variations: [],
    userId: req.user.id,
  }, function(err, experiment) {
    if(err) { return handleError(res, err); }
    return res.json(201, experiment);
  });
};

// Updates an existing experiment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Experiment.findById(req.params.id, function (err, experiment) {
    if (err) { return handleError(res, err); }
    if(!experiment) { return res.send(404); }
    var updated = _.merge(experiment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, experiment);
    });
  });
};

// Deletes a experiment from the DB.
exports.destroy = function(req, res) {
  Experiment.findById(req.params.id, function (err, experiment) {
    if(err) { return handleError(res, err); }
    if(!experiment) { return res.send(404); }
    experiment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
