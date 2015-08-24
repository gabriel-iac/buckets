var mongoose  = require('mongoose');
var User      = require('./user');
var sport     = require('./sport');
var country   = require('./country');


var locationSchema = new mongoose.Schema({
  name  : String,
  // country: { type: Schema.Types.ObjectId, ref: 'Country' }
  // sport: { type: Schema.Types.ObjectId, ref: 'Sport' }
  long: String,
  lat: String,
  image: String
  // users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // creator: { type: Schema.Types.ObjectId, ref: 'User' }
}); 
var Location = mongoose.model('Location', locationSchema)
module.exports = Location;