'use strict';

var express = require('express');
var controller = require('./variations.controller');
var auth = require('../../auth/auth.service');

var router = express.Router({mergeParams: true});

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/file', auth.isAuthenticated(), controller.showFile);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;
