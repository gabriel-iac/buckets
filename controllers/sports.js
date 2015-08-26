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


function populateLocations(req, res){
  var popLocations =  Sport.findOne({ _id: req.params.id }).populate('locations').exec(function(err, sports) {
   if (err) {
     res.json({ err: err, message: 'Something wrong !' });
   } else {
     res.json(sports);
   }
 });
};



module.exports = {
  createSport: createSport,
  getSports: getSports,
  populateLocations :populateLocations
}