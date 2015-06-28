'use strict';

var express = require('express');
var controller = require('./variations.controller');
var auth = require('../../auth/auth.service');
var Variation = require('./variation.model');

var router = express.Router({mergeParams: true});

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/:id', controller.update);
router.get('/:id/download', controller.showFile(false));
router.get('/:id/zip', controller.showFile(true));
router.post('/', auth.isAuthenticated(), controller.create);
router.use('/:variationId/reports/', function(req, res, next) {
  Variation.findById(req.params.variationId, function(err, variation) {
    if (err) { return res.send(500, err) }
    if (!variation) { return res.send(404); }
    req.variation = variation;
    return next();
  });
});
router.use('/:variationId/reports/', require('../report'));

module.exports = router;
