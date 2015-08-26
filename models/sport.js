var mongoose = require('mongoose');
var location     = require('./location');
var Schema = mongoose.Schema


var sportSchema = new mongoose.Schema({
  name : String,
  location: [{ type: Schema.Types.ObjectId, ref: 'Location' }]


})

var Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport



