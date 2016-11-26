var mongoose = require('mongoose');
var appConfig = require('../config/app.config.js');

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0); 
  }); 
});

var db = mongoose.createConnection(appConfig.mongodb);
module.exports = db;