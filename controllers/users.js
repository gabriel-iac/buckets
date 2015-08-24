var User = require('../models/user');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

function getAllUsers(req, res){
  var users = User.find({} , function(err, users){
    res.json(users);
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


module.exports = {
  getAllUsers: getAllUsers,
  showUser: showUser,
  updateUser: updateUser
}
