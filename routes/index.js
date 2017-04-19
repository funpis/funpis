var express = require('express');
var passport = require('passport');
var Account = require('../mongo').Account;
var router = express.Router();
var util = require('util');

/* calculate a vote id */
function make_vote_id() {
	var chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var cl = chars.length;
	var r = "";

	for (var i=0; i<11; i++) {
		r += chars[Math.floor(Math.random()*cl)]
	}

	return r;
}

function read_vote_from_db(vid) {

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'FunPis', user: req.user});
});

/* GET vote page. */
router.get('/vote', function(req, res, next) {
  res.render('vote', {title: 'VoteRun', user: req.user});
});

/* GET vote page by a vote id. */
router.get('/v/:vid', function(req, res, next) {
  res.render('getvote', {title: 'VoteRun', user: req.user, vid: req.params.vid});
});

/*
router.get('/', function(req, res) {
	res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
	res.render('register', { });
});
*/

router.post('/register', function(req, res) {
	Account.register(new Account({username: req.body.username}),
		             req.body.password,
		             req.body.email,
		             function(err, account) {
		if (err) {
			return res.render('index',
				              {title: 'FunPis', account: account});
		}

		passport.authenticate('local')(req, res, function() {
			res.redirect('/');
		});
	});
});

/*
router.get('/login', function(req, res) {
	console.log("1req: %j", req);
	res.render('login', {user: req.user});
});
*/

router.post('/login', passport.authenticate('local'), function(req, res) {
	console.log(req);
	res.redirect('/')
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/ping', function(req, res) {
	res.status(200).send('pong!');
});

module.exports = router;
