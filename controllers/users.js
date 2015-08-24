var User = require('../models/user');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

function getAllUsers(req, res){
  var users = User.find({} , function(err, users){
    res.json(users);
  }) 
}

function createUser(req, res){
  //create new location object
  //save the location
  //add to db
  // render the object to json
  console.log(req.body);
  var newUser = new User(req.body);
    newUser.save(function(err){
      if(err){console.log(err)}
        else{
          res.json(newUser);
        }
    })
}

function home(req, res){

  res.render('users/index')
} 


module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser
}
