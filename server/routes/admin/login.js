var fs = require('fs');
var del = require('del');
var path = require('path');
var winston = require('winston');
var express = require('express');
var passport = require('passport');
var Account = require('../../models/account');
var router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {  
  fs.readdir('uploads', (err, files) => {
    let tempFilesExist = false;
    if (!err) {
      tempFilesExist = files && files.length;
    }
    res.render('index', { user: req.user, pageTitle: 'Index', tempFilesExist });
  });
});

router.delete('/tempfiles', ensureAuthenticated, (req, res) => {
  fs.readdir('uploads', (err, files) => {
    files = files.map((file) => {
      return path.join(__dirname, '../../../uploads', file);
    });

    if (!err && files.length) {
      del(files).then((paths) => {
        res.json({ data: paths });
      }, (reason) => {
        winston.error('Cannot delete temp files', reason);
        res.json(500, { data: null, message: 'Cannot delete temp files.' });
      });
    } else {
      winston.error('Cannot delete temp files', err);
      res.json(500, { data: null, message: err.message });
    }
  });
});

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