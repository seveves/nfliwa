var express = require('express');
var moment = require('moment');
var router = express.Router();
var Event = require('../../models/event');

router.get('/events/next', (req, res, next) => {
  let date = Date.now();
  if (req.query.d) {
    date = new Date(req.query.d);
  }
  date = moment(date).startOf('day').utc().toDate();

  Event.find({ 'eventDate': { $gte: date } })
    .sort('+eventDate')
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

router.get('/events/:id', (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) return next(err);

    res.json(event);
  });
});

module.exports = router;