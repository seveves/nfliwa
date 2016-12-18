var express = require('express');
var router = express.Router();
var Static = require('../../models/static');

router.get('/static', (req, res) => {
  Static.find({})
    .sort('pageIndex')
    .select({ 'title': 1, 'url': 1, '_id': 0 })
    .exec((err, titles) => res.json({ data: titles }));
});

router.get('/static/:url', (req, res, next) => {
  let url = req.params.url;
  if (url) {
    Static.findOne({ 'url': url }, { 'title': 1, 'body': 1, '_id': 0 }, (err, data) => {
      if (!err) {
        res.json({ data });
      } else {
        res.json(500, { data: null, error: err });
      }
    });
  } else {
    res.json(404, { data: null, error: 'Cannot find page with url ' + url });
  }
});

module.exports = router;