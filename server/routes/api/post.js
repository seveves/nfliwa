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

      let nextLink = null;
      if (posts.length >= amount) {
        nextLink ='/api/posts' + '?a=' + amount + '&p=' + (page + 1);
      }

      let prevLink = null;
      if (page > 0) {
        prevLink = '/api/posts' + '?a=' + amount + '&p=' + (page - 1);
      }

      res.json({ next: nextLink, prev: prevLink, posts: posts });
  });
});

module.exports = router;