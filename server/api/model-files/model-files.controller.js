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

exports.create = function(req, res) {
  var form = new multiparty.Form({
    uploadDir: './uploads'
  });

  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(201);
  });
};
