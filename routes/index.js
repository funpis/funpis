var express = require('express');
//var passport = require('passport');
var Account = require('../mongo').Account;
var Vote = require('../mongo').Vote;
var VoteMenu = require('../mongo').VoteMenu;
var VoteOption = require('../mongo').VoteOption;
var VoteComment = require('../mongo').VoteComment;
var router = express.Router();
var util = require('util');
var moment = require('moment');

/* calculate a 12 length id */
function make_12_id() {
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var cl = chars.length;
    var r = "";

    for (var i=0; i<12; i++) {
        r += chars[Math.floor(Math.random()*cl)]
    }

    return r;
}

function read_vote_from_db(vid) {
	var vote = {};

    Vote.findOne({'vote_id': vid}).exec(function(err, v) {
        if (err || !v) {
            console.error(err.stack);
            return res.status(500).send('get vote error');
        }
        console.log('v: ', v);

	    VoteMenu.findOne({'vote_id': vid}).exec(function(err, vm) {
	        if (err || !vm) {
	            console.error(err.stack);
	            return res.status(500).send('get votemenu error');
	        }
            console.log('vm: ', vm);

		    VoteOption.findOne({'vote_id': vid}).exec(function(err, vo) {
		        if (err || !vo) {
		            console.error(err.stack);
		            return res.status(500).send('get voteoption error');
		        }
                console.log('vo: ', vo);

	            vote.vote = v;
	            vote.votemenu = vm;
			    vote.voteoption = vo;

	            return vote;
		    });
	    });
    });
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
    console.log('vote_id=', req.params.vid);
    var vid = req.params.vid;
    //var vote = read_vote_from_db(req.params.vid);
    //console.log('vote: ', vote);
    //res.render('getvote', {title: 'VoteRun', u: req.user, v: vote});
    Vote.findOne({'vote_id': vid}).exec(function(err, v) {
        if (err || !v) {
            console.error(err.stack);
            return res.status(500).send('get vote error');
        }

	    VoteMenu.findOne({'vote_id': vid}).exec(function(err, vm) {
	        if (err || !vm) {
	            console.error(err.stack);
	            return res.status(500).send('get votemenu error');
	        }

		    VoteOption.findOne({'vote_id': vid}).exec(function(err, vo) {
		        if (err || !vo) {
		            console.error(err.stack);
		            return res.status(500).send('get voteoption error');
		        }

                var vote = {};
	            vote.vote = v;
	            vote.votemenu = vm;
			    vote.voteoption = vo;
                console.log('v: ', JSON.stringify(vote));

                return res.render('getvote', {title: 'VoteRun', u: req.user, v: JSON.stringify(vote)});
		    });
	    });
    });
});

/* GET new vote page. */
router.get('/new', function(req, res, next) {
    res.render('new_vote', {title: 'VoteRun', user: req.user});
});

/*
router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});
*/

/*
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
*/

/*
router.get('/login', function(req, res) {
    console.log("1req: %j", req);
    res.render('login', {user: req.user});
});
*/

/*
router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log(req);
    res.redirect('/')
});
*/

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res) {
    res.status(200).send('pong!');
});

router.post('/add_user', function(req, res) {
    var a = new Account();
    a.user_id = make_12_id();
    a.username = req.body.username;
    a.password = req.body.password;
    a.email = req.body.email;
    a.save(function(err) {
        if (err) {
            console.error(err.stack);
            return res.status(500).send('add user error');
        } else {
            return res.status(200).json({ message: 'User created! uid=' + a.user_id});
        }
    });
});

router.post('/add_vote', function(req, res) {
    var v = new Vote();
    v.vote_id = make_12_id();
    v.vote_title = req.body.title;
    v.publisher_id = req.body.publisher_id;
    v.publish_time = moment.utc();
    v.expire_time = moment(req.body.expire_time);//'2017-10-10T12:00:00Z'
    v.chart_type = 'bar';
    v.topic_title = req.body.topic_title;    
    v.topic_content = req.body.topic_content;
    v.anonymous_publish = req.body.anonymous_publish;
    v.anonymous_ticket = req.body.anonymous_ticket;
    v.anonymous_comment = req.body.anonymous_comment;
    v.save(function(err) {
        if (err) {
            console.error(err.stack);
            return res.status(500).send('add vote error');
        }
    });

    var vm = new VoteMenu();
    vm.vote_id = v.vote_id;
    vm.save(function(err) {
        if (err) {
            Vote.remove({vote_id: v.vote_id}, function(v_err) {
                if (v_err) {
                    console.error(v_err.stack);
                    return res.status(500).send('add votemenu error, remove vote error');
                }
            });
            console.error(err.stack);
            return res.status(500).send('add votemenu error');
        }
    });

    var vo = new VoteOption();
    vo.vote_id = v.vote_id;
    vo.sequence = [0, 1, 2, 3, 4, 5, 6];
    vo.name_0 = "Mon";
    vo.count_0 = 0;
    vo.color_0 = [255, 99, 132];
    vo.name_1 = "Tue";
    vo.count_1 = 0;
    vo.color_1 = [54, 162, 235];
    vo.name_2 = "Wed";
    vo.count_2 = 0;
    vo.color_2 = [255, 206, 86];
    vo.name_3 = "Thu";
    vo.count_3 = 0;
    vo.color_3 = [75, 192, 192];
    vo.name_4 = "Fri";
    vo.count_4 = 0;
    vo.color_4 = [153, 99, 255];
    vo.name_5 = "Sat";
    vo.count_5 = 0;
    vo.color_5 = [255, 159, 64];
    vo.name_6 = "Sun";
    vo.count_6 = 0;
    vo.color_6 = [240, 80, 210];
    vo.save(function(err) {
        if (err) {
            VoteMenu.remove({vote_id: v.vote_id}, function(vm_err) {
                if (vm_err) {
                    console.error(vm_err.stack);
                    return res.status(500).send('add voteoption error, remove votemenu error');
                }
            });
            Vote.remove({vote_id: v.vote_id}, function(v_err) {
                if (v_err) {
                    console.error(v_err.stack);
                    return res.status(500).send('add voteoption error, remove vote error');
                }
            });
            console.error(err.stack);
            return res.status(500).send('add voteoption error');
        }
    });

    res.status(200).json({ message: 'Vote created! vid=' + v.vote_id});
});

module.exports = router;
