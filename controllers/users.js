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
<<<<<<< HEAD
  getAllUsers: getAllUsers,
  showUser: showUser,
  updateUser: updateUser
}
=======
  home: home
}
>>>>>>> 34a6c2d5bf95ebe19977502f05bef9eb5fd0e095
