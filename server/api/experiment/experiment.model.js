'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExperimentSchema = new Schema({
  name: String,
  description: String,
  variations: [{type: Schema.Types.ObjectId, ref: 'Variation'}],
  userId: Schema.Types.ObjectId,
  metrics: Object
});

module.exports = mongoose.model('Experiment', ExperimentSchema);
