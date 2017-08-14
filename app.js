var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');

var Account = require('./mongo').Account;


/*
var init = require('./routes/init');
var users = require('./routes/users');
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: '$w7P1551P7w$'
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

var index = require('./routes/index');
app.use('/', index);

// mongoose
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/voterun');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// init database
//init.init_add_account();

/*
// passport config
var Account = require('./mongo').Account;
passport.use(new LocalStrategy(Account.authenticate()));
*/

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(serializedUser, done){
    Account.findById(serializedUser._id, function(err, user){
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    {usernameField: 'username', passwordField: 'password'},
    function(username, password, done) {
        process.nextTick(function() {
            Account.findOne({username: username}, function(err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, {message: "User not exist."});

                if (user.password !== password)
                    return done(null, false, {message: "Password Error."});

                return done(null, user);
            });
        });
    }
));

module.exports = app;
