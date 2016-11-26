var express = require('express');
var router = express.Router();
var Post = require('../../models/post');

router.get('/posts', function(req, res, next) {

  let amount = 10;
  if (req.query.a) {
    let newAmount = parseInt(req.query.a);
    if (newAmount > 5) {
      amount = newAmount;
    }
  }
  let skip = 0;
  let page = 0;
  if (req.query.p) {
    let currentPage = parseInt(req.query.p);
    if (currentPage > 0) {
      page = currentPage;
      skip = currentPage * amount;
    }
  }

  Post.find({})
    .sort('-date')
    .limit(amount)
    .skip(skip)
    .exec(function(err, posts) {
      if (err) {
        return next(err);
      }

      let next = null;
      if (posts.length >= amount) {
        next ='/api/posts' + '?a=' + amount + '&p=' + (page + 1);
      }

      let prev = null;
      if (page > 0) {
        prev = '/api/posts' + '?a=' + amount + '&p=' + (page - 1);
      }

      let response = { next, prev, posts }

      res.json(response);
  });
});

module.exports = router;