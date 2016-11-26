var Schema = require('mongoose').Schema;
var db = require('../database/db');

var PostSchema = new Schema({
  title: { type: String },
  body: { type: String },
  date: { type: Date, default: Date.now },
  images: [{ imageId: String, imageUrl: String, base64: String }]
});

module.exports = db.model('Post', PostSchema);     