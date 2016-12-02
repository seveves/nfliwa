var Schema = require('mongoose').Schema;
var db = require('../database/db');

var EventSchema = new Schema({
  title: { type: String },
  body: { type: String },
  location: { type: String },
  lat: { type: String },
  long: { type: String },
  eventDate: { type: Date },
  date: { type: Date, default: Date.now }
});

module.exports = db.model('Event', EventSchema);     