var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    email: String
});

var Vote = new Schema({
    vid: String,
    title: String,
    chart_type: String,
    chart_data: String,
    chart_options: String
});

Account.plugin(passportLocalMongoose);

module.exports = {
  Account: mongoose.model('Account', Account),
}
