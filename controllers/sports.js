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

function getSports(req, res){
  var sports = Sport.find({} , function(err, sports){
    res.json(sports);
  }); 
};

module.exports = {
  createSport: createSport,
  getSports: getSports
}