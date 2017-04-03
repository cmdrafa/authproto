var express = require('express');
var exphbs = require('express-handlebars');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var TwitterStrategy = require('passport-twitter');
var GoogleStrategy = require('passport-google');
var FacebookStrategy = require('passport-facebook');


// var config = require('./config.js')
// var functs = require('./functs.js')

var app = express();

//Express Configurations
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

//Middleware for persisten session

app.use(function(req, res, next){
    var err = req.session.error;
    var msg = req.session.notice;
    var success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;
    if (err){
        res.locals.error = err;
    } 
    if (msg){
        res.locals.notice = msg;
    } 
    if (success){
        res.locals.success = success;
} 

  next();
});

//Express config for handlebars template
var hbs = exphbs.create({
    defaultLayout: 'main', 
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Listening on: " + port);




