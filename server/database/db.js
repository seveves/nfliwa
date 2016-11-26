var mongoose = require('mongoose');

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0); 
  }); 
});

var db = mongoose.createConnection('mongodb://localhost/naturfreunde');
module.exports = db;