var http = require('http');
var express = require('express');
var moment = require('moment');
var jimp = require('jimp');
var router = express.Router();
var Event = require('../../models/event');

router.get('/events/next', (req, res, next) => {
  let date = Date.now();
  if (req.query.d) {
    date = new Date(req.query.d);
  }
  date = moment(date).startOf('day').utc().toDate();

  Event.find({ 'eventDate': { $gte: date } })
    .sort({ eventDate: 1 })
    .exec(function(err, events) {
      if (err) return next(err);

      res.json(events);
  });
});

router.get('/events/last', (req, res, next) => {
  let amount = 10;
  let date = Date.now();

  if (req.query.a) {
    let newAmount = parseInt(req.query.a);
    if (newAmount > 10) {
      amount = newAmount;
    }
  }

  if (req.query.d) {
    date = new Date(req.query.d);
  }
  date = moment(date).startOf('day').utc().toDate();    

  Event.find({ 'eventDate': { $lt: date } })
    .sort('-eventDate')
    .limit(amount)
    .exec(function(err, events) {
      if (err) return next(err);

      res.json(events);
  });
});

router.get('/events/location', (req, res, next) => {
  let googleMapsKey = require('../../config/app.config').googlemaps;
  let lat = req.query.lat;
  let long = req.query.long;

  let url = `http://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}`+
  `&zoom=16&size=640x400&markers=color:red%7C${lat},${long}&key=${googleMapsKey}`;

  http.get(url, (gRes) => {
    const statusCode = gRes.statusCode;
    if (statusCode !== 200) {
      error = new Error(`Request Failed. Status Code: ${statusCode}`);
      gRes.resume();
      next();
    }

    gRes.setEncoding('binary');
    let idx = 0;
    let len = parseInt(gRes.headers['content-length']);
    let body = new Buffer(len);
    gRes.on('data', (chunk) => {
      body.write(chunk, idx, 'binary');
      idx += chunk.length;
    });
    gRes.on('end', () => {
      res.contentType = 'image/png';
      res.send(body);
    });

  }).on('error', (e) => next());
});

router.get('/events/:id', (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) return next(err);

    res.json(event);
  });
});

module.exports = router;