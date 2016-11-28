var express = require('express');
var passport = require('passport');
var Account = require('../../models/account');
var router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => res.render('index', { user : req.user, pageTitle: 'Index' }));

router.get('/login', (req, res) => res.render('login', { user : req.user, pageTitle: 'Login' }));

router.post('/login', passport.authenticate('local', { successRedirect: '/admin',
                                                       failureRedirect: '/admin/login',
                                                       failureFlash: true }));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  
  res.redirect('/admin/login');
}

module.exports = router;