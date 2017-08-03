var express = require('express');
//var passport = require('passport');
var Account = require('../mongo').Account;
var Vote = require('../mongo').Vote;
var VoteMenu = require('../mongo').VoteMenu;
var VoteOption = require('../mongo').VoteOption;
var VoteTicket = require('../mongo').VoteTicket;
var VoteTopic = require('../mongo').VoteTopic;
var VoteComment = require('../mongo').VoteComment;
var router = express.Router();
var util = require('util');
var moment = require('moment');

/* calculate a length=12 id */
function make_12_id() {
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var cl = chars.length;
    var r = "";

    for (var i=0; i<12; i++) {
        r += chars[Math.floor(Math.random()*cl)]
    }

    return r;
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
    Vote.findOne({'vote_id': vid}).exec(function(err, v) {
        if (err || !v) {
            console.error(err.stack);
            return res.status(500).send('get Vote error');
        }

    VoteMenu.findOne({'vote_id': vid}).exec(function(err, vm) {
        if (err || !vm) {
            console.error(err.stack);
            return res.status(500).send('get VoteMenu error');
        }

    VoteOption.findOne({'vote_id': vid}).lean().exec(function(err, vo) {
        if (err || !vo) {
            console.error(err.stack);
            return res.status(500).send('get VoteOption error');
        }

    VoteTopic.findOne({'vote_id': vid}).lean().exec(function(err, vt) {
        if (err || !vt) {
            console.error(err.stack);
            return res.status(500).send('get VoteTopic error');
        }

    VoteComment.find({'vote_id': vid}).lean().exec(function(err, vc) {
        if (err || !vc) {
            console.error(err.stack);
            return res.status(500).send('get VoteComment error');
        }

        var vote = {};
        vote.vote = v;
        vote.votemenu = vm;
        vote.voteoption = vo;
        vote.votetopic = vt;
        vote.votecomment = vc;

        v_str = JSON.stringify(vote);
        v_str = v_str.replace(/\//g, "\\/");
        v_str = v_str.replace(/\'/g, "\\'");
        console.log('v_str: ', v_str);

        return res.render('getvote', {title: 'VoteRun', u: req.user, v: v_str});
    }); // VoteComment
    }); // VoteTopic
    }); // VoteOption
    }); // VoteMenu
    }); // Vote
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
    v.vote_title = req.body.vote_title;
    v.publisher_id = req.body.publisher_id;
    v.publish_time = moment.utc();
    v.expire_time = moment(req.body.expire_time);//'2017-10-10T12:00:00Z'
    v.chart_type = 'horizontalBar';
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
    vo.option[0] = {"name": "Mon", "type": "fix", "ticket": 10};
    vo.option[1] = {"name": "Tue", "type": "fix", "ticket": 55};
    vo.option[2] = {"name": "Wed", "type": "fix", "ticket": 36};
    vo.option[3] = {"name": "Thu", "type": "fix", "ticket": 11};
    vo.option[4] = {"name": "Fri", "type": "fix", "ticket": 7};
    vo.option[5] = {"name": "Sat", "type": "add", "ticket": 15};
    vo.option[6] = {"name": "Sun", "type": "add", "ticket": 28};
    /*
    vo.type_0 = "fix";
    vo.count_0 = 10;
    vo.name_1 = "Tue";
    vo.type_1 = "fix";
    vo.count_1 = 55;
    vo.name_2 = "Wed";
    vo.type_2 = "fix";
    vo.count_2 = 36;
    vo.name_3 = "Thu";
    vo.type_3 = "fix";
    vo.count_3 = 11;
    vo.name_4 = "Fri";
    vo.type_4 = "fix";
    vo.count_4 = 7;
    vo.name_5 = "Sat";
    vo.type_5 = "add";
    vo.count_5 = 15;
    vo.name_6 = "Sun";
    vo.type_6 = "add";
    vo.count_6 = 28;
    */
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
