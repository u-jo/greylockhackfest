'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VariationSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: String,
  description: String,
  filename: String,
});

module.exports = mongoose.model('Variation', VariationSchema);
