var db = require('../database/db');
var Schema = require('mongoose').Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new Schema({
    username: String,
    password: String
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = db.model('Account', AccountSchema);