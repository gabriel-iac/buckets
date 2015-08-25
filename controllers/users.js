var User = require('../models/user');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


function getAllUsers(req, res){
  var users = User.find({} , function(err, users){
    res.json(users);
  }).select('-password -_id -__v')
}

function createUser(req, res){
  var user = new User(req.body);
  user.save(function(err){
    if(err) console.log(err);
    console.log("User created")
    res.redirect('/api/users')
  })
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
function postLogin(request, response) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect : "/",
    failureRedirect : "/",
    failureFlash : true
  });
  return loginStrategy(request, response);
}


function logout(req, res){
  req.logout();
  res.redirect('/')
}

function postSignup(req, res) {
  // var signupStrategy = passport.authenticate('local-signup', {
  //   successRedirect : "/",
  //   failureRedirect : "/",
  //   failureFlash : true
  // });
  // return signupStrategy(request, response);
  res.status(200).send({ 
    message: "Thank you for authenticating",
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWRjMzcyNWI0M2IyMmI4NGI4MDY5ZmQiLCJmaXJzdF9uYW1lIjoiR2FicmllbGUiLCJsYXN0X25hbWUiOiJJYWNvcGV0dGkiLCJpbWFnZSI6ImltYWdlIiwiZW1haWwiOiJnYWJAZ2FiLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJfX3YiOjAsImxvY2F0aW9ucyI6W119.T61ZwiumFk6LYeknJ8f7FqqZlPRQQgrOjIugiS70BlA"
  });
  // passport.authenticate('local-signup', function(err, user){
  //   if (err) {
  //     res.status(403).send({ message: err});
  //   } else {
  //     res.status(200).send({ message: "Here we are! "});
  //   } 
  // });
}


module.exports = {
  getAllUsers: getAllUsers,
  showUser: showUser,
  createUser: createUser,
  updateUser: updateUser,
  logout: logout,
  postLogin: postLogin,
  postSignup: postSignup
}

