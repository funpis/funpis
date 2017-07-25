var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    user_id: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
});

var Vote = new Schema({
    vote_id: {type: String, required: true, unique: true},
    vote_title: {type: String, required: true},
    publisher_id: {type: String, required: true},
    publish_time: {type: Date, dafault: Date.now},
    expire_time: {type: Date, dafault: Date.now},
    chart_type: {type: String, default: 'bar'},
    bar_fix_color: {type: String, default: '#4169e1'},
    bar_add_color: {type: String, default: '#7cfc00'},
    topic_title: {type: String},
    topic_content: {type: String},
    anonymous_publish: {type: Boolean, required:true},
    anonymous_ticket: {type: Boolean, required:true},
    anonymous_comment: {type: Boolean, required:true},
});

var VoteMenu = new Schema({
    vote_id: {type: String, required: true},
    ticket: {type: Number, default: 0},
    shoot: {type: Number, default: 0},
    quote: {type: Number, default: 0},
    watch: {type: Number, default: 0},
    comment: {type: Number, default: 0},
});

var VoteOption = new Schema({
    vote_id: {type: String, required: true},
    option: [{
        name: String,
        note: String,
        type: String,
        ticket: Number
    }],
});

var VoteTicket = new Schema({
    vote_id: {type: String, required:true},
    voter_id: {type: String, required: true},
    vote_time: {type: Date, dafault: Date.now},
    vote_option: {type: String, required:true},
});

var VoteComment = new Schema({
    vote_id: {type: String, required: true},
    comment_id: {type: String, required: true},
    parent_id: {type: String},
    reply_id: {type: String},
    publisher_id: {type: String, required: true},
    publish_time: {type: Date, dafault: Date.now},
    content: {type: String, required: true},
    good: {type: Number, default: 0},
    bad: {type: Number, default: 0},
});

//Account.plugin(passportLocalMongoose);

module.exports = {
  Account: mongoose.model('Account', Account),
  Vote: mongoose.model('Vote', Vote),
  VoteMenu: mongoose.model('VoteMenu', VoteMenu),
  VoteOption: mongoose.model('VoteOption', VoteOption),
  VoteTicket: mongoose.model('VoteTicket', VoteTicket),
  VoteComment: mongoose.model('VoteComment', VoteComment),
}
