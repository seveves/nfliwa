var express = require('express');
var passport = require('passport');
var Account = require('../../models/account');
var router = express.Router();

router.get('/', ensureAuthenticated, function (req, res) {
  res.render('index', { user : req.user, pageTitle: 'Index' });
});

router.get('/register', function(req, res) {
  res.render('register', { pageTitle: 'Register' });
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account, pageTitle: 'Register' });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/admin');
    });
  });
});

router.get('/login', function(req, res) {  
  res.render('login', { user : req.user, pageTitle: 'Login' });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/admin',
                                                       failureRedirect: '/admin/login',
                                                       failureFlash: true }));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/admin/login');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("authed");
    return next();
  }
  
  res.redirect('/admin/login');
}

module.exports = router;