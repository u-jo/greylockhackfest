'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VariationSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: String,
  description: String,
  filename: String,
  experimentId: Schema.Types.ObjectId,
  data: Object,
  reports: [{type: Schema.Types.ObjectId, ref: 'Report'}],
});

module.exports = mongoose.model('Variation', VariationSchema);
