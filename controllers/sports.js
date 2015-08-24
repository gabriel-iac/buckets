var Sport = require('../models/sport');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

function createSport(req, res){
  var newSport = new Sport(req.body);
    newSport.save(function(err){
      if(err){console.log(err)}
        else{
          res.json(newSport);
        };
    });
};

module.exports = {
createSport: createSport

}