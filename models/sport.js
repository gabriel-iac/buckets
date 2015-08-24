var mongoose = require('mongoose');

var sportSchema = new mongoose.Schema({
  name : String
})

var Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport