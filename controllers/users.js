var User = require('../models/user');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');


function getAllUsers(req, res){
  var users = User.find({} , function(err, users){
    res.json(users);
  }).select('-password -_id -__v')
}

function getCurrentUser(req, res){
  if (req.query.id) {
    User.findById(req.query.id, function(err, user){
      res.json(user);
    }).select('-password -_id -email -__v');
  } else {
    res.status(404).send({ message: "There is no current user."})
  }
}

function createUser(req, res){
  // var user = new User(req.body);
  // user.save(function(err){
  //   if(err) console.log(err);
  //   console.log("User created")
  //   res.redirect('/api/users')
  // })
}

function updateUser(req, res){
  User.findByIdAndUpdate(req.params.id, req.body, function(err, users){
   if(err)
     res.send(err)
   res.json({'message': 'User update'})
 })
}


function showUser(req, res){
  User.findById(req.params.id, function(err, user){
    res.json(user)
  }).select('-password -_id -__v')
}

// POST /login 
function postLogin(req, res) {
  // var loginStrategy = passport.authenticate('local-login',function(err, user, info) {
  // if (err) return next(err)
     
  //  if (!user) {
  //    return res.status(401).send({ error: 'Something went wrong...' });
  //  }

  //  //user has authenticated correctly thus we create a JWT token 
  //  var tokenSecret = process.env.EXTREMEADVISOR_SECRET || "iloveextremesport";
  //  var token = jwt.sign({ user: user._id }, tokenSecret);

  //  //send back the token to the front-end to store in a cookie
  //  res.status(200).send({ 
  //    message: "Thank you for authenticating",
  //    token: token
  //  });
  // })(req, res, next);
}

function postSignup(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) return next(err)
      
    if (!user) {
      return res.status(401).send({ error: 'Something went wrong...' });
    }

    //user has authenticated correctly thus we create a JWT token 
    var tokenSecret = process.env.EXTREMEADVISOR_SECRET || "iloveextremesport";
    var token = jwt.sign({ user: user._id }, tokenSecret);

    var user = {
      id: user._id,
    }

    //send back the token to the front-end to store in a cookie
    res.status(200).send({ 
      message: "Thank you for authenticating",
      token: token,
      user: user
    });

  })(req, res, next);
}

// Deprecated?
function logout(req, res){
  console.log(req);
  req.logout();
  res.redirect('/');
}

module.exports = {
  getAllUsers: getAllUsers,
  getCurrentUser: getCurrentUser,
  showUser: showUser,
  createUser: createUser,
  updateUser: updateUser,
  logout: logout,
  postSignup: postSignup,
  postLogin: postLogin  
}