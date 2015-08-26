var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var User      = require('./user');
var sport     = require('./sport');
var country   = require('./country');


var locationSchema = new mongoose.Schema({
  location_name  : String,
  sport: { type: Schema.Types.ObjectId, ref: 'Sport' },
  lat: String,
  lng: String,
  image: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' }
}); 

var Location = mongoose.model('Location', locationSchema)
module.exports = Location;