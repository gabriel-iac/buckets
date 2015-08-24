var mongoose   = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  first_name  : String,
  last_name   : String,
  image       : String,
  email       : String,
  password    : String,
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