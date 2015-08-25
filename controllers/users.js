var User = require('../models/user');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


function getAllUsers(req, res){
  var users = User.find({} , function(err, users){
    res.json(users);
  }) 
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
  })
}

function logout(req, res){
  req.logout();
  res.redirect('/')
}




module.exports = {
  getAllUsers: getAllUsers,
  showUser: showUser,
  createUser: createUser,
  updateUser: updateUser,
  logout: logout,
}

