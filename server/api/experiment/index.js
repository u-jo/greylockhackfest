'use strict';

var express = require('express');
var controller = require('./experiment.controller');
var auth = require('../../auth/auth.service');
var Experiment = require('./experiment.model');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.use('/:experimentId/variations/', function(req, res, next) {
  Experiment.findById(req.params.experimentId, function(err, experiment) {
    if (err) { return res.send(500, err) }
    if (!experiment) { return res.send(404); }
    req.experiment = experiment;
    return next();
  });
});
router.use('/:experimentId/variations/', require('../variations'));

module.exports = router;
