var express = require('express');
var winston = require('winston');
var compression = require('compression'); 
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var appConfig = require('./config/app.config.js');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());

// session setup
var db = require('./database/db');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: appConfig.secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public')));

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// routes
app.use('/api', require('./routes/api/post'));
app.use('/api', require('./routes/api/event'));
app.use('/api', require('./routes/api/static'));
app.use('/admin', require('./routes/admin/login'));
app.use('/admin', require('./routes/admin/posts')(io));
app.use('/admin', require('./routes/admin/events')());
app.use('/admin', require('./routes/admin/static')());

// error handler
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// client routes (SPA) and 404
app.use(function(req, res) {

  if (req.url === '/') {
    res.redirect('/client');
    return;
  }

  if (req.url.startsWith('/client')) {
    res.sendFile(path.join(__dirname, '../public/client/index.html'));
    return;
  }

  res.status(404);
  res.render('error', { user: req.user, error: new Error('Cannot find ' + req.url), pageTitle: '404' });
});

// start server when databse is connected
db.on('open', function() {
  let port = process.env.PORT || 3000;
  server.listen(port, function () {
    winston.info('server - listening on port ' + port);
  });
});

// error logging
function logErrors (err, req, res, next) {
  winston.error(err.stack);
  next(err);
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', { user: req.user, error: err, pageTitle: 'Error' });
}
