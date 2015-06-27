'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExperimentSchema = new Schema({
  name: String,
  description: String,
  variations: [Schema.Types.ObjectId],
  userId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Experiment', ExperimentSchema);
