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
    promoter_id: {type: String, required: true},
    publish_time: {type: Date, dafault: Date.now},
    start_time: {type: Date},
    expire_time: {type: Date},
    chart_type: {type: String, default: 'horizontalBar'},
    bar_fix_color: {type: String, default: '#4169e1'},
    bar_add_color: {type: String, default: '#7cfc00'},
    promoter_anonymous: {type: Boolean, default: false},
    commenter_anonymous: {type: Boolean, default: false},
    voter_anonymous: {type: Boolean, default: false},
    voter_authorized: {type: Boolean, default: false},
    max_ticket_one_voter: {type: Number, default: 1},
    voter_add_option: {type: Boolean, default: false},
    max_add_option: {type: Number, default: 0},
    max_add_option_one_voter: {type: Number, default: 0},
    max_show_option: {type: Number, default: 0},
    remove_time: {type: Date},
});

var VoteTopic = new Schema({
    vote_id: {type: String, required: true},
    topic_title: {type: String},
    topic_content: {type: String},
    topic_url: {type: String},
});

var Tag = new Schema({
    tag_id: {type: String, required: true},
    tag_name: {type: String, required: true},
    tag_count: {type: Number, default: 0},
});

var VoteTag = new Schema({
    vote_id: {type: String, required: true},
    tag_id: {type: String, required: true},
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
        id: Number,
        name: String,
        note: String,
        fix: Boolean,
        ticket: Number
    }],
});

var VoteTicket = new Schema({
    vote_id: {type: String, required:true},
    voter_id: {type: String, required: true},
    vote_time: {type: Date, dafault: Date.now},
    vote_option_id: {type: Number, required:true},
    remove_time: {type: Date},
});

var VoteComment = new Schema({
    vote_id: {type: String, required: true},
    comment_id: {type: String, required: true},
    parent_id: {type: String},
    former_id: {type: String},
    commenter_id: {type: String, required: true},
    comment_time: {type: Date, dafault: Date.now},
    content: {type: String, required: true},
    good: {type: Number, default: 0},
    bad: {type: Number, default: 0},
    remove_time: {type: Date},
});

var VoteCommentTap = new Schema({
    vote_id: {type: String, required: true},
    comment_id: {type: String, required: true},
    commenter_id: {type: String, required: true},
    comment_time: {type: Date, dafault: Date.now},
    good: {type: Boolean, default: false},
    bad: {type: Boolean, default: false},
});

//Account.plugin(passportLocalMongoose);

module.exports = {
  Account: mongoose.model('Account', Account),
  Vote: mongoose.model('Vote', Vote),
  VoteTopic: mongoose.model('VoteTopic', VoteTopic),
  Tag: mongoose.model('Tag', Tag),
  VoteTag: mongoose.model('VoteTag', VoteTag),
  VoteMenu: mongoose.model('VoteMenu', VoteMenu),
  VoteOption: mongoose.model('VoteOption', VoteOption),
  VoteTicket: mongoose.model('VoteTicket', VoteTicket),
  VoteComment: mongoose.model('VoteComment', VoteComment),
  VoteCommentTap: mongoose.model('VoteCommentTap', VoteCommentTap),
}
