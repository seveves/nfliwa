var Schema = require('mongoose').Schema;
var db = require('../database/db');

var StaticSchema = new Schema({
  title: { type: String },
  url: { type: String },
  body: { type: String },
  pageIndex: { type: Number },
});

module.exports = db.model('Static', StaticSchema);     