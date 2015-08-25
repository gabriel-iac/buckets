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


userSchema.methods.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
}


var User = mongoose.model('User', userSchema);
module.exports = User; 