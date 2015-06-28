'use strict';

var express = require('express');
var controller = require('./variations.controller');
var auth = require('../../auth/auth.service');

var router = express.Router({mergeParams: true});

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/:id', controller.update);
router.get('/:id/download', controller.showFile);
router.get('/:id/zip', auth.attachUser(), controller.showFile);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;
