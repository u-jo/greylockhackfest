'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReportSchema = new Schema({
  reportType: String,
  filename: String,
  variation: {type: Schema.Types.ObjectId, ref: 'Variation'},
});

module.exports = mongoose.model('Report', ReportSchema);
