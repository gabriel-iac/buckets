var Location = require('../models/location');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

function getAllLocations(req, res){
  var locations = Location.find({} , function(err, locations){
    res.json(locations);
  }); 
};

function getNewLocation(req,res){
  console.log('hello')
  res.render('locations/new');
};


function getLocation(req, res){
res.render('users/index')
}



function createLocation(req, res){
  //create new location object
  //save the location
  //add to db
  // render the object to json
  console.log(req.body);
  var newlocation = new Location(req.body);
    newlocation.save(function(err){
      if(err){console.log(err)}
        else{
          res.json(newlocation);
        };
    });
};

function getLocation(req, res){
   Location.findById(req.params.id, function(err, location){
    res.json(location)
  });
};

module.exports = {
  getAllLocations: getAllLocations,
  createLocation: createLocation,
  getLocation: getLocation,
  getNewLocation: getNewLocation
}