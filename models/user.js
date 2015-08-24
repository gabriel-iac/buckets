var mongoose   = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema    = mongoose.Schema;

var userSchema = new mongoose.Schema({
  first_name  : String,
  last_name   : String,
  image       : String,
  email: {
    type: String,
    unique: true,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  locations   : [{ type: Schema.Types.ObjectId, ref: 'Location' }],
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  }
})

userSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User; 