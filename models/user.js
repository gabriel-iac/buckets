<<<<<<< HEAD
var mongoose   = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
=======
var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
>>>>>>> 960dee5e9553ad657de922952da6f307ef4dd6da

var userSchema = new mongoose.Schema({
  first_name  : String,
  last_name   : String,
  image       : String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  locations   : [{ type: Schema.Types.ObjectId, ref: 'Location' }],
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  }
})

var User = mongoose.model('User', userSchema);
module.exports = User; 