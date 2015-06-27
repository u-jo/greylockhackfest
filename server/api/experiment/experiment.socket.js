/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Experiment = require('./experiment.model');

exports.register = function(socket) {
  Experiment.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Experiment.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('experiment:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('experiment:remove', doc);
}