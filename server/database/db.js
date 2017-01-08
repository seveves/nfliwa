var mongoose = require('mongoose');
var winston = require('winston');
var appConfig = require('../config/app.config.js');

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    winston.info('Mongoose default connection disconnected through app termination');
    process.exit(0); 
  }); 
});

var db = mongoose.createConnection(appConfig.mongodb);
module.exports = db;