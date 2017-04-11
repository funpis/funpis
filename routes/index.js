var express = require('express');
var passport = require('passport');
var Account = require('../mongo').Account;
var router = express.Router();
var util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'FunPis', user: req.user});
});

/* GET topic page. */
router.get('/topic', function(req, res, next) {
  res.render('topic', {title: 'FunPis', user: req.user});
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
