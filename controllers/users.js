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

function postSignup(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) return next(err)
      
    if (!user) {
      return res.status(401).send({ error: 'Something went wrong...' });
    }

    //user has authenticated correctly thus we create a JWT token 
    var tokenSecret = process.env.EXTREMEADVISOR_SECRET || "iloveextremesport";
    var token = jwt.sign({ user: user._id }, tokenSecret);

    //send back the token to the front-end to store in a cookie
    res.status(200).send({ 
      message: "Thank you for authenticating",
      token: token
    });

  })(req, res, next);
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

