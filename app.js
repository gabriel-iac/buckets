var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 3000; 
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var morgan = require('morgan');
var mongoose = require('mongoose');
var router = express.Router();
var userRouter = express.Router();
var locationRouter = express.Router();
//var FacebookStrategy = require('passport-facebook').Strategy
var passport = require('passport');
var config = require('./config/config');
var jwt = require('express-jwt');
var cookieParser = require('cookie-parser');
var flash        = require('connect-flash');
var session      = require('express-session');
var Sport = require('./models/sport');


var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost/buckets';
mongoose.connect(databaseURL); 

// mongoose.connect('mongodb://localhost/buckets');
require('./config/passport')(passport);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'buckets-cookie' })); 
app.use(flash()); 

// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session())

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.set('superSecret', config.secret);
app.set("views", "./views");
app.set("view engine", "ejs");

// Only used to serve the static website.
app.get('/', function(req, res){
  Sport.find({}, function(err, sports){
    if(err) console.log(err);
    res.render('index', {sports:sports})
  })

})

// app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
// app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//  successRedirect: '/',
//  failureRedirect: '/'
// }));

var routes = require('./config/routes');

app.use("/api", routes);

app.listen(port, function(){
  console.log('listening on port 3000')
});