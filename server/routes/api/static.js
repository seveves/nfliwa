var express = require('express');
var router = express.Router();
var Static = require('../../models/static');

router.get('/static', (req, res) => {
  Static.find({})
    .sort('pageIndex')
    .select({ 'title': 1, 'url': 1, 'pageIndex': 1, '_id': 0 })
    .exec((err, titles) => {
      if (!err) {
        res.json({ data: titles });
      } else {
        res.status(500).json({ data: null, error: err });
      }
    });
});

router.get('/static/title/:url', (req, res, next) => {
  let url = req.params.url;
  if (url) {
    Static.findOne({ 'url': url }, (err, data) => {
      if (!err && data !== null) {
        res.json({ data: data.title });
      } else {
        res.status(500).json({ data: null, error: err });
      }
    });
  } else {
    res.status(404).json({ data: null, error: 'Cannot find page with url ' + url });
  }
});

router.get('/static/:url', (req, res, next) => {
  let url = req.params.url;
  if (url) {
    Static.findOne({ 'url': url }, { 'title': 1, 'body': 1, '_id': 0 }, (err, data) => {
      if (!err) {
        res.json({ data });
      } else {
        res.status(500).json({ data: null, error: err });
      }
    });
  } else {
    res.status(404).json({ data: null, error: 'Cannot find page with url ' + url });
  }
});

module.exports = router;