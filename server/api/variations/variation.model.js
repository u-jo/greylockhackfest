'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VariationSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: String,
  description: String,
  filename: String,
  experimentId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Variation', VariationSchema);
